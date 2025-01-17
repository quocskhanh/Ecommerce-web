"""Create order_item table

Revision ID: 8aa845528e4b
Revises: 833083873418
Create Date: 2025-01-17 19:35:03.251646

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8aa845528e4b'
down_revision: Union[str, None] = '833083873418'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'order_item',
        sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
        sa.Column('order_id', sa.Integer(), sa.ForeignKey('order.id', ondelete='CASCADE'), nullable=False),
        sa.Column('product_id', sa.Integer(), sa.ForeignKey('product.id', ondelete='CASCADE'), nullable=False),
        sa.Column('quantity', sa.Integer(), nullable=False),
        sa.Column('price_per_item', sa.Float(), nullable=False),
    )


def downgrade() -> None:
    op.drop_table('order_item')