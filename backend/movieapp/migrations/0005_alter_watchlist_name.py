# Generated by Django 4.1.9 on 2023-08-31 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movieapp', '0004_watchlist_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='watchlist',
            name='name',
            field=models.CharField(default='demo', max_length=255),
            preserve_default=False,
        ),
    ]
