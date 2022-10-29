from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class PurchaseListForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])
    submit = SubmitField('Submit')