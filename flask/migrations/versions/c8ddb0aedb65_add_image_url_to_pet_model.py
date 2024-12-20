"""Add image_url to Pet model

Revision ID: c8ddb0aedb65
Revises: 
Create Date: 2024-12-03 16:31:40.979034

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c8ddb0aedb65'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pet')
    with op.batch_alter_table('pets', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_url', sa.String(length=255), nullable=True))
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(length=255),
               type_=sa.String(length=50),
               nullable=False)
        batch_op.alter_column('species',
               existing_type=sa.VARCHAR(length=50),
               type_=sa.String(length=20),
               nullable=False)
        batch_op.alter_column('breed',
               existing_type=sa.VARCHAR(length=100),
               type_=sa.String(length=50),
               existing_nullable=True)
        batch_op.alter_column('age',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('weight',
               existing_type=sa.NUMERIC(precision=5, scale=2),
               type_=sa.Float(),
               nullable=False)
        batch_op.alter_column('vaccinated',
               existing_type=sa.BOOLEAN(),
               nullable=False)
        batch_op.alter_column('user_id',
               existing_type=sa.VARCHAR(length=255),
               type_=sa.String(length=50),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pets', schema=None) as batch_op:
        batch_op.alter_column('user_id',
               existing_type=sa.String(length=50),
               type_=sa.VARCHAR(length=255),
               nullable=True)
        batch_op.alter_column('vaccinated',
               existing_type=sa.BOOLEAN(),
               nullable=True)
        batch_op.alter_column('weight',
               existing_type=sa.Float(),
               type_=sa.NUMERIC(precision=5, scale=2),
               nullable=True)
        batch_op.alter_column('age',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('breed',
               existing_type=sa.String(length=50),
               type_=sa.VARCHAR(length=100),
               existing_nullable=True)
        batch_op.alter_column('species',
               existing_type=sa.String(length=20),
               type_=sa.VARCHAR(length=50),
               nullable=True)
        batch_op.alter_column('name',
               existing_type=sa.String(length=50),
               type_=sa.VARCHAR(length=255),
               nullable=True)
        batch_op.drop_column('image_url')

    op.create_table('pet',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(length=255), autoincrement=False, nullable=True),
    sa.Column('species', sa.VARCHAR(length=50), autoincrement=False, nullable=True),
    sa.Column('breed', sa.VARCHAR(length=100), autoincrement=False, nullable=True),
    sa.Column('age', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('weight', sa.NUMERIC(precision=5, scale=2), autoincrement=False, nullable=True),
    sa.Column('vaccinated', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.Column('additional_info', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('user_id', sa.VARCHAR(length=255), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='pet_pkey')
    )
    # ### end Alembic commands ###
