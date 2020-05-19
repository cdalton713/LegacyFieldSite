import json
from datetime import datetime, timedelta

# import redis
# import rq
from flask import current_app as app
# from flask_login import UserMixin
from sqlalchemy.sql import ClauseElement
# from wtforms import SelectMultipleField
from marshmallow_sqlalchemy.fields import Nested
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from config import SCHEMA_MAIN, SCHEMA_WEBSITE
from backend import db, ma


class User(db.Model):
    __tablename__ = 'users'
    __table_args__ = {'schema': SCHEMA_WEBSITE}

    id = db.Column(db.Integer, primary_key=True)
    social_id = db.Column(db.String(64), nullable=False, unique=True)
    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(64))
    email = db.Column(db.String(64), nullable=False, unique=True)
    name = db.Column(db.String(120), unique=True)
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)
    logged_in = db.Column(db.Boolean())

    # uploads = db.relationship('Upload', back_populates='user')
    # token = db.relationship('OAuth2Token', back_populates='user_')

    def __ref__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}'"

    # def launch_task(self, name, description, *args, **kwargs):
    #     rq_job = app.task_queue.enqueue('backend.tasks.' + name, self.id, *args, **kwargs)
    #     task = Task(id=rq_job.get_id(), name=name, description=description,
    #                 user=self)
    #     db.session.add(task)
    #     return task

    # def get_tasks_in_progress(self):
    #     return Task.query.filter_by(user=self, complete=False).all()
    #
    # def get_task_in_progress(self, name):
    #     return Task.query.filter_by(name=name, user=self,
    #                                 complete=False).first()


class OAuth2Token(db.Model):
    # __table_args__' = {'schema': SCHEMA_WEBSITE}
    __table_args__ = {'schema': SCHEMA_WEBSITE}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    token_type = db.Column(db.String(40))
    access_token = db.Column(db.String(10000))
    refresh_token = db.Column(db.String(10000))
    expires_at = db.Column(db.Integer)
    user = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_WEBSITE}.users.id'))

    # user_ = db.relationship('User', back_populates='token')

    def to_token(self):
        return dict(
            access_token=self.access_token,
            token_type=self.token_type,
            refresh_token=self.refresh_token,
            expires_at=self.expires_at,
        )

    @staticmethod
    def check_token(token):
        user = OAuth2Token.query.filter_by(access_token=token).first()
        if user is None or user.token_expiration < datetime.utcnow():
            return None
        return user

    def revoke_token(self):
        self.expires_at = datetime.utcnow() - timedelta(seconds=1)


class Upload(db.Model):
    __tablename__ = 'upload'
    __table_args__ = {'schema': SCHEMA_WEBSITE}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), db.ForeignKey(f'{SCHEMA_WEBSITE}.users.email'), nullable=False, unique=False)
    job_id = db.Column(db.String(10), db.ForeignKey(f'{SCHEMA_MAIN}.jobs.job_id'), index=True, unique=False)
    job_num = db.Column(db.Integer)
    file_name = db.Column(db.String(256), index=True, unique=False)
    file_group = db.Column(db.String(256), index=False, unique=False)
    run_num = db.Column(db.Integer, default=-1)
    bha_num = db.Column(db.Integer, default=-1)
    file_path = db.Column(db.String(2048), index=False, unique=False)
    datetime_uploaded = db.Column(db.DateTime, default=datetime.utcnow)
    uuid = db.Column(db.String(128), unique=True, index=True)
    action = db.Column(db.String(64))
    type = db.Column(db.String(32))

    jobs = db.relationship('Job', backref='upload')

    def __ref__(self):
        return f"File('{self.original_file_name}', '{self.date_uploaded}')"


class Session(db.Model):
    __tablename__ = 'sessions'
    __table_args__ = {'schema': SCHEMA_WEBSITE}

    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.String(255), unique=True)
    data = db.Column(db.LargeBinary)
    expiry = db.Column(db.DateTime)

    def __init__(self, session_id, data, expiry):
        self.session_id = session_id
        self.data = data
        self.expiry = expiry

    def __repr__(self):
        return '<Session data %s>' % self.data


class Well(db.Model):
    __tablename__ = 'wells'
    __table_args__ = {'schema': SCHEMA_MAIN}

    well_id = db.Column(db.Integer, primary_key=True)
    api = db.Column(db.BigInteger)
    well_name = db.Column(db.String(60), nullable=False, unique=True)
    country = db.Column(db.String(45))
    basin = db.Column(db.String(45))
    state = db.Column(db.String(2))
    county = db.Column(db.String(45))
    township = db.Column(db.String(5))
    section = db.Column(db.String(5))
    range = db.Column(db.String(5))
    field = db.Column(db.String(45))
    target = db.Column(db.String(45))
    type = db.Column(db.String(45), nullable=False, server_default=str("'HORIZONTAL'"))
    lat = db.Column(db.DECIMAL(15, 8))
    long = db.Column(db.DECIMAL(15, 8))
    elevation = db.Column(db.SmallInteger)
    rkb = db.Column(db.Integer)

    jobs = db.relationship('Job', backref='well')


class Job(db.Model):
    __tablename__ = 'jobs'
    __table_args__ = {'schema': SCHEMA_MAIN}

    job_num = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.String(45), nullable=False, unique=True)
    well_id = db.Column(db.ForeignKey(f'{SCHEMA_MAIN}.wells.well_id', ondelete='RESTRICT', onupdate='CASCADE'),
                        nullable=False,
                        index=True)
    operator = db.Column(db.String(45))
    rig = db.Column(db.String(45))
    dd_job = db.Column(db.String(1), nullable=False, server_default=str("'Y'"))
    mwd_job = db.Column(db.String(1), nullable=False, server_default=str("'Y'"))
    mwd_vendor = db.Column(db.String(45))
    status = db.Column(db.String(45))
    office = db.Column(db.String(5))
    sp_start_date = db.Column(db.Date)
    sp_end_date = db.Column(db.Date)



class WellNameSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Well
        # include_relationships = True
        load_instance = True


class GeneralJobSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Job
        # include_fk = True
        load_instance = True

    well = ma.Nested(WellNameSchema)


class IncidentInvolving(db.Model):
    __tablename__ = 'incident_involving'
    __table_args__ = {'schema': SCHEMA_MAIN}

    id = db.Column(db.Integer, primary_key=True)
    incident_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.incident.incident_id'), nullable=False,
                            unique=False)
    well_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.wells.well_id'))
    job_num = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.jobs.job_num'))
    run_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.mwd_trs.mwd_trs_id'))
    bha_id = db.Column(db.Integer)
    involving = db.Column(db.String(128))

    # well = db.relationship('Wells', backref='well')
    # job = db.relationship('Job', backref='job')
    # incident = db.relationship('Incident', backref='involving')
    # trs = db.relationship('MwdTrs', backref='trs', primaryjoin="IncidentInvolving.run_id == MwdTrs.mwd_trs_id")


class IncidentOccurred(db.Model):
    __tablename__ = 'incident_occurred'
    __table_args__ = {'schema': SCHEMA_MAIN}

    incident_occurred_id = db.Column(db.Integer, primary_key=True)
    incident_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.incident.incident_id'), nullable=False,
                            unique=False)
    well_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.wells.well_id'))
    job_num = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.jobs.job_num'))
    run_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.mwd_trs.mwd_trs_id'))
    bha_id = db.Column(db.Integer)
    occurred = db.Column(db.String(128))

    # well = db.relationship('Well')
    # job = db.relationship('Job')
    # incident = db.relationship('Incident', backref='occurred')
    # trs = db.relationship('MwdTrs', primaryjoin='IncidentOccurred.run_id == MwdTrs.mwd_trs_id')


class IncidentSymptom(db.Model):
    __tablename__ = 'incident_symptom'
    __table_args__ = {'schema': SCHEMA_MAIN}

    incident_symptom_id = db.Column(db.Integer, primary_key=True)
    incident_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.incident.incident_id'), nullable=False,
                            unique=False)
    well_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.wells.well_id'))
    job_num = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.jobs.job_num'))
    run_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.mwd_trs.mwd_trs_id'))
    bha_id = db.Column(db.Integer)
    symptom = db.Column(db.String(128))

    # well = db.relationship('Well')
    # job = db.relationship('Job')
    # trs = db.relationship('MwdTrs', primaryjoin='IncidentSymptom.run_id == MwdTrs.mwd_trs_id')
    # symptomType = db.relationship('ChoicesIncidentSymptom', backref='symptom')


class Incident(db.Model):
    __tablename__ = 'incident'
    __table_args__ = {'schema': SCHEMA_MAIN}

    well_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.wells.well_id'))
    job_num = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.jobs.job_num'))
    public_incident_id = db.Column(db.String(20))
    incident_id = db.Column(db.Integer, primary_key=True)
    general_incident = db.Column(db.String(128))
    bha_id = db.Column(db.ForeignKey(f'{SCHEMA_MAIN}.bha_main.bha_id'))
    run_id = db.Column(db.ForeignKey(f'{SCHEMA_MAIN}.mwd_trs.mwd_trs_id'))
    mwd_personnel = db.Column(db.String(128), unique=False)
    dd_personnel = db.Column(db.String(128), unique=False)
    incident_date = db.Column(db.Date, nullable=False)
    estimated_downtime = db.Column(db.Integer)
    run_number = db.Column(db.Integer, nullable=False)
    bha_number = db.Column(db.Integer, nullable=False)
    yn_mwd_tools = db.Column(db.Boolean)
    yn_bha_components = db.Column(db.Boolean)
    yn_surface_equipment = db.Column(db.Boolean)
    yn_drilling_parameters = db.Column(db.Boolean)
    yn_mud_properties = db.Column(db.Boolean)
    hole_depth = db.Column(db.Float)
    hole_size = db.Column(db.Float)
    rpm = db.Column(db.Float)
    collar_id = db.Column(db.Float)
    collar_od = db.Column(db.Float)
    wob = db.Column(db.Float)
    flow_rate = db.Column(db.Float)
    spm = db.Column(db.Float)
    spp = db.Column(db.Float)
    differential = db.Column(db.Float)
    pulse_width = db.Column(db.Float)
    pulse_amplitude = db.Column(db.Float)
    mud_type = db.Column(db.Float)
    mud_weight = db.Column(db.Float)
    mud_viscosity = db.Column(db.Float)
    mud_solids = db.Column(db.Float)
    mud_sand = db.Column(db.Float)
    mud_lcm = db.Column(db.Float)
    mud_ph = db.Column(db.Float)
    well_section = db.Column(db.String(32))

    description = db.Column(db.String)
    corrective_actions = db.Column(db.String)
    analysis_findings = db.Column(db.String)
    office_corrective_actions = db.Column(db.String)

    status = db.Column(db.String(64))
    progress_update = db.Column(db.String)
    root_cause = db.Column(db.String)
    root_cause_category = db.Column(db.String(128))
    xto_class = db.Column(db.Integer)
    final_npt = db.Column(db.Float)
    mtbf_related = db.Column(db.Boolean)
    dd_mwd = db.Column(db.String(5))
    edits = db.Column(db.String)

    # incident_symptom = db.relationship('IncidentSymptom')
    # IncidentOccurred = db.relationship('IncidentOccurred')
    # incident_involving = db.relationship('IncidentInvolving')
    # well = db.relationship('Well')
    # job = db.relationship('Job')

    @property
    def json(self):
        return to_json(self, self.__class__)


def to_json(inst, cls):
    """
    Jsonify the sql alchemy query result.
    """
    convert = dict()
    # add your coversions for things like datetime's
    # and what-not that aren't serializable.
    d = dict()
    for c in cls.__table__.columns:
        v = getattr(inst, c.name)
        if c.type in convert.keys() and v is not None:
            try:
                d[c.name] = convert[c.type](v)
            except:
                d[c.name] = "Error:  Failed to covert using ", str(convert[c.type])
        elif v is None:
            d[c.name] = str()
        else:
            d[c.name] = v
    return json.dumps(d)


class IncidentComponent(db.Model):
    __tablename__ = 'incident_component'
    __table_args__ = {'schema': SCHEMA_MAIN}

    incident_component_id = db.Column(db.Integer, primary_key=True)
    incident_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.incident.incident_id'), nullable=False,
                            unique=False)
    well_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.jobs.well_id'))
    job_num = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.jobs.job_num'))
    bha_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.bha_main.bha_id'))
    run_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_MAIN}.mwd_trs.mwd_trs_id'))
    tool_type = db.Column(db.String(64))
    tool_serial = db.Column(db.String(64))
    ubho_type = db.Column(db.Text(10))

    # incident = db.relationship('Incident')
    # trs = db.relationship('MwdTrs', primaryjoin='IncidentComponent.run_id == MwdTrs.mwd_trs_id')
    # job = db.relationship('Job', primaryjoin='IncidentComponent.job_num == Job.job_num')
    # well = db.relationship('Job', primaryjoin='IncidentComponent.well_id == Job.well_id')


class BhaMain(db.Model):
    __tablename__ = 'bha_main'
    __table_args__ = {
        'schema': SCHEMA_MAIN  # ,
        # 'index': db.Index('index4', 'job_num', 'job_bha', unique=True)
    }

    bha_id = db.Column(db.Integer, primary_key=True)
    well_id = db.Column(db.ForeignKey(f'{SCHEMA_MAIN}.jobs.well_id', ondelete='RESTRICT', onupdate='CASCADE'),
                        nullable=False, index=True)
    job_num = db.Column(db.ForeignKey(f'{SCHEMA_MAIN}.jobs.job_num', ondelete='RESTRICT', onupdate='CASCADE'),
                        nullable=False, index=True)
    job_bha = db.Column(db.Integer, nullable=False)
    bit_type = db.Column(db.String(45))
    bit_tfa = db.Column(db.Float)
    motor_type = db.Column(db.String(45))
    nb_stab_od = db.Column(db.String(45))
    motor_pad_od = db.Column(db.String(45))
    motor_model = db.Column(db.String(45))
    bend_type = db.Column(db.String(45), nullable=False, server_default=str("'UNKNOWN'"))
    motor_bend = db.Column(db.Float)
    motor_stator = db.Column(db.String(45))
    motor_stages = db.Column(db.Float)
    motor_rpg = db.Column(db.Float)
    bit_bend = db.Column(db.Float)
    bit_sensor = db.Column(db.Float)
    bit_gamma = db.Column(db.Float)
    bha_comments = db.Column(db.Text(2048))
    reason_pulled = db.Column(db.String(3))
    xto_failure_class = db.Column(db.Integer)
    start_depth = db.Column(db.String(5))
    end_depth = db.Column(db.Integer)
    footage = db.Column(db.Integer)
    last_edit = db.Column(db.String(45))

    # job = db.relationship('Job', primaryjoin='BhaMain.job_num == Job.job_num')
    # well = db.relationship('Job', primaryjoin='BhaMain.well_id == Job.well_id')


class MwdTrs(db.Model):
    __tablename__ = 'mwd_trs'
    # __table_args__ = (
    #     db.Index('mwd_trs_pk_2', 'well_id', 'job_num', 'DATE_TIME_BELOW_ROTARY', unique=True),
    #     db.Index('mwd_trs_pk', 'well_id', 'job_num', 'HOLE', 'run_num', unique=True)
    # )

    __table_args__ = {
        'schema': SCHEMA_MAIN
    }
    mwd_trs_id = db.Column(db.Integer, primary_key=True)
    well_id = db.Column(db.ForeignKey(f'{SCHEMA_MAIN}.wells.well_id', ondelete='RESTRICT', onupdate='CASCADE'),
                        nullable=False, index=True)
    job_num = db.Column(db.ForeignKey(f'{SCHEMA_MAIN}.jobs.job_num', ondelete='RESTRICT', onupdate='CASCADE'),
                        nullable=False, index=True)
    HOLE = db.Column(db.Integer, nullable=False, server_default=str("'-1'"))
    run_num = db.Column(db.Integer, nullable=False)
    DD_BHA = db.Column(db.Integer)
    DATE_TIME_BELOW_ROTARY = db.Column(db.DateTime)
    DEPTH_IN = db.Column(db.Float(asdecimal=True))
    DATE_TIME_ABOVE_ROTARY = db.Column(db.DateTime)
    DEPTH_OUT = db.Column(db.Float(asdecimal=True))
    HOURS_BELOW_ROTARY = db.Column(db.Float)
    DISTANCE_DRILLED = db.Column(db.Float(asdecimal=True))
    HOURS_CIRC = db.Column(db.Float(asdecimal=True))
    HOLE_SIZE = db.Column(db.Float(asdecimal=True))
    TOOL_COLLAR_OD = db.Column(db.Float(asdecimal=True))
    TOOL_COLLAR_ID = db.Column(db.Float(asdecimal=True))
    TOOL_1 = db.Column(db.Text)
    TOOL_2 = db.Column(db.Text)
    TOOL_3 = db.Column(db.Text)
    TOOL_4 = db.Column(db.Text)
    TOOL_5 = db.Column(db.Text)
    TOOL_6 = db.Column(db.Text)
    TOOL_7 = db.Column(db.Text)
    TOOL_8 = db.Column(db.Text)
    UBHO = db.Column(db.Text)
    UBHO_FLOW = db.Column(db.Text)
    BATTERY_1_START_AH = db.Column(db.Float(asdecimal=True))
    BATTERY_1_END_AH = db.Column(db.Float(asdecimal=True))
    BATTERY_2_START_AH = db.Column(db.Float(asdecimal=True))
    BATTERY_2_END_AH = db.Column(db.Float(asdecimal=True))
    TOOL_TFO = db.Column(db.Float(asdecimal=True))
    AVG_MUD_WEIGHT = db.Column(db.Float(asdecimal=True))
    MUD_TYPE = db.Column(db.Text)
    AVG_GPM = db.Column(db.Float(asdecimal=True))
    AVG_MUD_SOLIDS = db.Column(db.Float(asdecimal=True))
    AVG_MUD_SAND = db.Column(db.Float(asdecimal=True))
    MAX_TEMP = db.Column(db.Float(asdecimal=True))
    PULSE_WIDTH = db.Column(db.Float(asdecimal=True))
    PULSE_SIZE = db.Column(db.Float(asdecimal=True))
    MAX_AXIAL_SHOCK = db.Column(db.Float(asdecimal=True))
    MAX_AXIAL_VIBE = db.Column(db.Float(asdecimal=True))
    MAX_RADIAL_SHOCK = db.Column(db.Float(asdecimal=True))
    MAX_RADIAL_VIBE = db.Column(db.Float(asdecimal=True))
    HOLE_SECTION = db.Column(db.Text)
    MWD_INCIDENT = db.Column(db.Text)
    NPT = db.Column(db.Float(asdecimal=True))
    RUN_COMMENT = db.Column(db.Text)
    RUN_POOH_REASON = db.Column(db.Text)

    # job = db.relationship('Job')
    # well = db.relationship('Well')


from backend import login


@login.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class ChoicesIncidentSymptom(db.Model):
    __tablename__ = 'choices_incident_symptom'
    __table_args__ = {'schema': SCHEMA_WEBSITE}

    id = db.Column(db.Integer)
    code = db.Column(db.String(128), primary_key=True)
    involving = db.Column(db.String(64))


# class Task(db.Model):
#     __tablename__ = 'tasks'
#     __table_args__ = {'schema': SCHEMA_WEBSITE}
#
#     id = db.Column(db.String(36), primary_key=True)
#     name = db.Column(db.String(128), index=True)
#     description = db.Column(db.String(256))
#     user_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA_WEBSITE}.users.id'))
#     complete = db.Column(db.Boolean, default=False)
#     date_time = db.Column(db.DateTime)
#
#     user = db.relationship('User', primaryjoin='Task.user_id == User.id')
#
#     def get_rq_job(self):
#         try:
#             rq_job = rq.job.Job.fetch(self.id, connection=app.redis)
#         except (redis.exceptions.RedisError, rq.exceptions.NoSuchJobError):
#             return None
#         return rq_job
#
#     def get_progress(self):
#         job = self.get_rq_job()
#         return job.meta.get('progress', 0) if job is not None else 100

def get_or_create(session, model, defaults=None, **kwargs):
    instance = session.query(model).filter_by(**kwargs).first()
    if instance:
        return instance
    else:
        params = dict((k, v) for k, v in kwargs.iteritems() if not isinstance(v, ClauseElement))
        if defaults:
            params.update(defaults)
        instance = model(**params)
        return instance
