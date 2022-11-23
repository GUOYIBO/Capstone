from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError


class ItemTypeForm(FlaskForm):
    name = StringField('name')
    image_url = StringField("image_url")
    submit = SubmitField('Submit')
