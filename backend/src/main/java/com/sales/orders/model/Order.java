package com.sales.orders.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    private String userId;
    private String direccionEnvio;
    private List<OrderItem> items;
    private String estatus;
    private double total;
}
