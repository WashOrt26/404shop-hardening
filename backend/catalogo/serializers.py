from rest_framework import serializers
from .models import Categoria, Producto, VarianteProducto, Anuncio


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ["id", "nombre", "descripcion", "posicion", "activo"]


class VarianteProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VarianteProducto
        fields = ["id","talle", "stock", "producto"]


class ProductoSerializer(serializers.ModelSerializer):
    categoria_nombre = serializers.CharField(
        source="categoria.nombre",
        read_only=True
    )

    variantes = VarianteProductoSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Producto
        fields = '__all__'

class AnuncioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anuncio
        fields = [
            "id",
            "titulo",
            "descripcion",
            "imagen",
            "posicion",
            "activo",
            "fecha_inicio",
            "fecha_fin"
        ]