from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError


class ItemForm(FlaskForm):
    quantity = IntegerField('quantity')
    purchase_date = StringField('purchase_date')
    expiration_date = StringField('expiration_date')
    submit = SubmitField('Submit')

