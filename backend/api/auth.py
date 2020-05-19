import os
import traceback
from datetime import timedelta
from flask import current_app as app
from flask import flash, redirect, render_template, session, url_for
from flask_login import current_user, login_user, logout_user
from backend.api import bp
from backend import db, oauth
from backend.models import OAuth2Token, User
from flask import request
import jwt
import requests
import sys

@bp.route("/login")
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home.index'))

    redirect_uri = os.environ.get('REDIRECT_URI')
    return oauth.azure.authorize_redirect(redirect_uri)



@bp.route('/.auth/login/aad/callback/')
def authorize():
    try:
        token = bytes(request.cookies.get('msal.idtoken'))
        print(token)
        client_id= 'ae109ae2-1dae-406e-ae47-158b6bb6c69c'
        public_key, kid = get_public_key(token)

        try:
            jwt.decode(
                token,
                public_key,
                algorithms='RS256',
                audience=client_id,
                leeway=timedelta(seconds=10)
            )
        except Exception as error:
            print('key {} did not worked, error: {}'.format(kid, error))
        print('Key worked!')


        app_id = 'bX-.8.GYGTPv75-0s24WT35pSAocMRF4oG'
        x = jwt.get_unverified_header(token)
        resp = oauth.azure.get('me')
        update_token(name='azure-react', access_token=token)
        profile = resp.json()
        session['access_token'] = token

        social_id = 'azure' + profile['id']
        username = profile['displayName']
        email = profile['mail']
        session['email'] = email
        first_name = username.split(' ')[0]
        last_name = username.split(' ')[-1]

        if social_id is None:
            flash('Authentication failed.', 'danger')
            return redirect(url_for('auth.login_needed'))

        user = User.query.filter_by(social_id=social_id).first()
        if not user:
            user = User(social_id=social_id, name=username, email=email, first_name=first_name, last_name=last_name)
            db.session.add(user)
            db.session.commit()


        # update_token(name='azure', token=token, access_token=True)

        login_user(user, remember=False, duration=timedelta(days=2))
        oauth2token = OAuth2Token.query.filter_by(user=current_user.get_id()).first()
        if not oauth2token:
            oauth2token = OAuth2Token(name='azure', token_type=token['token_type'], access_token=token['access_token'],
                                      refresh_token=token['refresh_token'],
                                      expires_at=token['expires_at'], user=current_user.get_id())
            db.session.add(oauth2token)
            db.session.commit()
    except:
            app.logger.error(f"""LOGIN EXCEPTION:\n{traceback.format_exc()}""")
            return redirect(url_for('api.login_needed'))

    try:
        if session['redirect_url']:
            url = session['redirect_url']
            session.pop('redirect_url')
            return redirect(url)
    except KeyError:
        return redirect(url_for('home.index'))
    return redirect(url_for('home.index'))


@bp.route('/login-required')
def login_needed():
    return render_template('auth/login_required.html')


@bp.route('/logout')
def logout():
    logout_user()
    return redirect('https://login.microsoftonline.com/{}/oauth2/logout?post_logout_redirect_uri={}'.format(app.config['TENANT_ID'], 'https://field.legacydirectional.com/login-required'))


def fetch_token(name):
    token = OAuth2Token.query.filter_by(
        name=name,
        user=current_user.get_id()
    ).first()

    return token.to_token()


def update_token(name, token=None, refresh_token=None, access_token=None):
    if refresh_token:
        item = OAuth2Token.query.filter_by(name=name, refresh_token=refresh_token).first()
    elif access_token:
        item = OAuth2Token.query.filter_by(name=name, access_token=access_token).first()
    else:
        return

    # update old token
    if token:
        item.access_token = token['access_token']
        item.refresh_token = token.get('refresh_token')
        item.expires_at = token['expires_at']
    elif token is None:
        if item is None:
            item = OAuth2Token()
            item.name = name
        item.access_token = access_token
    db.session.commit()
