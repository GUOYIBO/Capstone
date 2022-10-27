from flask_wtf import FlaskForm
from wtfforms import String
from wtforms.validators import DataRequired, ValidationError
from aap.modes import Item


class ItemForm(FlaskForm):
    pass
