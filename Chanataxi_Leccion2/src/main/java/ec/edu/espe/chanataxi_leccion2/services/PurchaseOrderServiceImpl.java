package ec.edu.espe.chanataxi_leccion2.services;

import ec.edu.espe.chanataxi_leccion2.models.entities.PurchaseOrder;
import ec.edu.espe.chanataxi_leccion2.repositories.PurchaseOrderRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    @Autowired
    private PurchaseOrderRepository repository;

    private static final List<String> ALLOWED_STATUS = Arrays.asList("DRAFT", "SUBMITTED", "APPROVED", "REJECTED", "CANCELLED");
    private static final List<String> ALLOWED_CURRENCY = Arrays.asList("USD", "EUR");

    @Override
    public PurchaseOrder createPurchaseOrder(PurchaseOrder purchaseOrder) {
        if (repository.existsByOrderNumber(purchaseOrder.getOrderNumber())) {
            throw new IllegalArgumentException("El orderNumber " + purchaseOrder.getOrderNumber() + " ya existe.");
        }

        return repository.save(purchaseOrder);
    }

    @Override
    public List<PurchaseOrder> getPurchaseOrders(String q, String status, String currency,
                                                 BigDecimal minTotal, BigDecimal maxTotal,
                                                 LocalDateTime from, LocalDateTime to) {

        if (status != null && !ALLOWED_STATUS.contains(status)) {
            throw new IllegalArgumentException("Status inválido para filtro. Permitidos: " + ALLOWED_STATUS);
        }

        if (currency != null && !ALLOWED_CURRENCY.contains(currency)) {
            throw new IllegalArgumentException("Currency inválido para filtro. Permitidos: " + ALLOWED_CURRENCY);
        }

        if (minTotal != null && minTotal.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("El minTotal no puede ser negativo");
        }
        if (maxTotal != null && maxTotal.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("El maxTotal no puede ser negativo");
        }

        if (from != null && to != null && from.isAfter(to)) {
            throw new IllegalArgumentException("La fecha 'from' no puede ser mayor que 'to'");
        }

        Specification<PurchaseOrder> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (q != null && !q.trim().isEmpty()) {
                String likePattern = "%" + q.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("orderNumber")), likePattern),
                        cb.like(cb.lower(root.get("supplierName")), likePattern)
                ));
            }

            if (status != null) predicates.add(cb.equal(root.get("status"), status));
            if (currency != null) predicates.add(cb.equal(root.get("currency"), currency));

            if (minTotal != null) predicates.add(cb.greaterThanOrEqualTo(root.get("totalAmount"), minTotal));
            if (maxTotal != null) predicates.add(cb.lessThanOrEqualTo(root.get("totalAmount"), maxTotal));

            if (from != null) predicates.add(cb.greaterThanOrEqualTo(root.get("createdAt"), from));
            if (to != null) predicates.add(cb.lessThanOrEqualTo(root.get("createdAt"), to));

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return repository.findAll(spec);
    }

    @Override
    public Optional<PurchaseOrder> getPurchaseOrderById(Long id) {
        return repository.findById(id);
    }

    @Override
    public PurchaseOrder updatePurchaseOrder(Long id, PurchaseOrder purchaseOrder) {
        PurchaseOrder existing = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Orden no encontrada con ID: " + id));

        // Actualizar campos permitidos
        existing.setSupplierName(purchaseOrder.getSupplierName());
        existing.setStatus(purchaseOrder.getStatus());
        existing.setTotalAmount(purchaseOrder.getTotalAmount());
        existing.setCurrency(purchaseOrder.getCurrency());
        existing.setExpectedDeliveryDate(purchaseOrder.getExpectedDeliveryDate());

        // Nota: orderNumber y createdAt generalmente no se actualizan

        return repository.save(existing);
    }

    @Override
    public void deletePurchaseOrder(Long id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("No se puede eliminar. Orden no encontrada con ID: " + id);
        }
        repository.deleteById(id);
    }
}