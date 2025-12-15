package ec.edu.espe.chanataxi_leccion2.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "purchase_order")
public class PurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    @NotBlank(message = "El número de orden es obligatorio")
    private String orderNumber;

    @NotBlank(message = "El nombre del proveedor es obligatorio")
    private String supplierName;

    @Pattern(regexp = "DRAFT|SUBMITTED|APPROVED|REJECTED|CANCELLED",
            message = "Estado inválido. Valores permitidos: DRAFT, SUBMITTED, APPROVED, REJECTED, CANCELLED")
    private String status;

    @NotNull(message = "El monto total es obligatorio")
    @DecimalMin(value = "0.0", inclusive = true, message = "El monto total no puede ser negativo")
    private BigDecimal totalAmount;

    @Pattern(regexp = "USD|EUR", message = "Moneda inválida. Solo se permite USD o EUR")
    private String currency;

    private LocalDateTime createdAt;

    @NotNull(message = "La fecha esperada de entrega es obligatoria")
    private LocalDate expectedDeliveryDate;

    public PurchaseOrder() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public String getSupplierName() { return supplierName; }
    public void setSupplierName(String supplierName) { this.supplierName = supplierName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDate getExpectedDeliveryDate() { return expectedDeliveryDate; }
    public void setExpectedDeliveryDate(LocalDate expectedDeliveryDate) { this.expectedDeliveryDate = expectedDeliveryDate; }

    @PrePersist
    public void prePersist() {
        if(this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }
}