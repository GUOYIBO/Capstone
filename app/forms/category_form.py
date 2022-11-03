from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError

class CategoryForm(FlaskForm):
    name = StringField('name')
    image_url = StringField('image')
    submit = SubmitField("Submit")
