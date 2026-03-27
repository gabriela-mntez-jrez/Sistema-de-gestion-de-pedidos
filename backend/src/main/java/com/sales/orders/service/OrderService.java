package com.sales.orders.service;

import com.sales.orders.model.Order;
import com.sales.orders.repository.OrderRepository;
import com.sales.orders.repository.UserRepository;

import org.springframework.stereotype.Service;
import com.sales.orders.exception.NotFoundException;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public Order create(Order order) {
        double total = 0;

        if (!userRepository.existsById(order.getUserId())) {
            throw new NotFoundException("User not found with id: " + order.getUserId());
        }

        if (order.getItems() == null || order.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order must have at least one item");
        }

        for (var item : order.getItems()) {
            total += item.getCantidad() * item.getPrecio();
        }

        order.setTotal(total);
        return orderRepository.save(order);
    }

    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    public Optional<Order> getById(String id) {
        return orderRepository.findById(id);
    }

    public Order update(String id, Order updatedOrder) {
        Order existing = orderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Order not found with id: " + id));

        updatedOrder.setId(existing.getId());

        double total = 0;
        if (updatedOrder.getItems() != null) {
            for (var item : updatedOrder.getItems()) {
                total += item.getCantidad() * item.getPrecio();
            }
        }

        updatedOrder.setTotal(total);

        return orderRepository.save(updatedOrder);
    }

    public void delete(String id) {
        if (!orderRepository.existsById(id)) {
            throw new NotFoundException("Order not found with id: " + id);
        }
        orderRepository.deleteById(id);
    }

    public List<Order> search(String query) {
        if (query == null || query.trim().isEmpty()) {
            return orderRepository.findAll();
        }

        String q = query.trim();

        List<Order> byStatus = orderRepository.findByEstatusContainingIgnoreCase(q);
        List<Order> byAddress = orderRepository.findByDireccionEnvioContainingIgnoreCase(q);
        List<Order> byUserId = orderRepository.findByUserIdContainingIgnoreCase(q);
        List<Order> byProductCode = orderRepository.findByItemsCodigoProductoContainingIgnoreCase(q);

        // join results and remove duplicates
        Set<Order> results = new HashSet<>();
        results.addAll(byStatus);
        results.addAll(byAddress);
        results.addAll(byUserId);
        results.addAll(byProductCode);

        return new ArrayList<>(results);
    }
}