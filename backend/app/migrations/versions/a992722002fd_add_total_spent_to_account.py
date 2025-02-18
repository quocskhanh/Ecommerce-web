"""Add total_spent to account

Revision ID: a992722002fd
Revises: aa8fed128da7
Create Date: 2025-01-15 17:01:32.178154

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a992722002fd'
down_revision: Union[str, None] = 'aa8fed128da7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('account', sa.Column('total_spent', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('account', 'total_spent')
    # ### end Alembic commands ###
