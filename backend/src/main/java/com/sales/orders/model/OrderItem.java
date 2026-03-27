package com.sales.orders.model;

import lombok.Data;

@Data
public class OrderItem {
    private String codigoProducto;
    private int cantidad;
    private double precio;
}
