from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class PurchaseListForm(FlaskForm):
    email = StringField('name', validators=[DataRequired()])
    password = StringField('content', validators=[DataRequired()])
    submit = SubmitField('Submit')