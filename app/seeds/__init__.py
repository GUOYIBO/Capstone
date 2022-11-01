from flask.cli import AppGroup
from .users import seed_users, undo_users
from .category import seed_categories
from .purchase_list import seed_purchase_list

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    print('users seeded')
    #seed_categories()
    print('categories seeded')
    seed_purchase_list()
    print('purchase-list seeded')

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # undo_categories()
    # Add other undo functions here
