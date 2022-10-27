from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError

class FavoriteDishForm(FlaskForm):
    name = StringField('Name', validator=[DataRequired()])
    image_url = StringField('Image')
    submit = SubmitField("Submit")