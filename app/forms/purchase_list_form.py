from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class PurchaseListForm(FlaskForm):
    name = StringField('name')
    content = StringField('content')
    submit = SubmitField('Submit')