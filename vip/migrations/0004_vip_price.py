# Generated by Django 4.2.1 on 2023-06-09 16:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vip', '0003_remove_vip_circle_alter_viplevel_level'),
    ]

    operations = [
        migrations.AddField(
            model_name='vip',
            name='price',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='vprice', to='vip.viplevel'),
        ),
    ]
