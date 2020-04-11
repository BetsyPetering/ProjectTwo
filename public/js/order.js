//copied from week 14 activity 14 public/js/blog.js

$(document).ready(function() {
    /* global moment */
  
    // orderContainer holds all of our orders
    var orderContainer = $(".order-container");
    var orderCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleOrderDelete);
    $(document).on("click", "button.edit", handleOrderEdit);
    // Variable to hold our orders
    var orders;
  
    // The code below handles the case where we want to get order orders for a specific Customer
    // Looks for a query param in the url for Customer_id
    var url = window.location.search;
    var CustomerId;
    if (url.indexOf("?Customer_id=") !== -1) {
      CustomerId = url.split("=")[1];
      getOrders(CustomerId);
    }
    // If there's no CustomerId we just get all orders as usual
    else {
      getOrders();
    }
  
  
    // This function grabs orders from the database and updates the view
    function getOrders(Customer) {
      CustomerId = Customer || "";
      if (CustomerId) {
        CustomerId = "/?Customer_id=" + CustomerId;
      }
      $.get("/api/orders" + CustomerId, function(data) {
        console.log("Orders", data);
        orders = data;
        if (!orders || !orders.length) {
          displayEmpty(Customer);
        }
        else {
          initializeRows();
        }
      });
    }
  
    // This function does an API call to delete orders
    function deleteOrder(id) {
      $.ajax({
        method: "DELETE",
        url: "/api/orders/" + id
      })
        .then(function() {
          getOrders(orderCategorySelect.val());
        });
    }
  
    // InitializeRows handles appending all of our constructed order HTML inside orderContainer
    function initializeRows() {
      orderContainer.empty();
      var ordersToAdd = [];
      for (var i = 0; i < orders.length; i++) {
        ordersToAdd.push(createNewRow(orders[i]));
      }
      orderContainer.append(ordersToAdd);
    }
  
    // This function constructs a order's HTML
    function createNewRow(order) {
      var formattedDate = new Date(order.createdAt);
      formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
      var newOrderCard = $("<div>");
      newOrderCard.addClass("card");
      var newOrderCardHeading = $("<div>");
      newOrderCardHeading.addClass("card-header");
      var deleteBtn = $("<button>");
      deleteBtn.text("x");
      deleteBtn.addClass("delete btn btn-danger");
      var editBtn = $("<button>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-info");
      var newOrderTitle = $("<h2>");
      var newOrderDate = $("<small>");
      var newOrderCustomer = $("<h5>");
      newOrderCustomer.text("Written by: " + order.Customer.name);
      newOrderCustomer.css({
        float: "right",
        color: "blue",
        "margin-top":
        "-10px"
      });
      var newOrderCardBody = $("<div>");
      newOrderCardBody.addClass("card-body");
      var newOrderBody = $("<p>");
      newOrderTitle.text(order.title + " ");
      newOrderBody.text(order.body);
      newOrderDate.text(formattedDate);
      newOrderTitle.append(newOrderDate);
      newOrderCardHeading.append(deleteBtn);
      newOrderCardHeading.append(editBtn);
      newOrderCardHeading.append(newOrderTitle);
      newOrderCardHeading.append(newOrderCustomer);
      newOrderCardBody.append(newOrderBody);
      newOrderCard.append(newOrderCardHeading);
      newOrderCard.append(newOrderCardBody);
      newOrderCard.data("order", order);
      return newOrderCard;
    }
  
    // This function figures out which order we want to delete and then calls deleteOrder
    function handleOrderDelete() {
      var currentOrder = $(this)
        .parent()
        .parent()
        .data("order");
      deleteOrder(currentOrder.id);
    }
  
    // This function figures out which order we want to edit and takes it to the appropriate url
    function handleOrderEdit() {
      var currentOrder = $(this)
        .parent()
        .parent()
        .data("order");
      window.location.href = "/cms?order_id=" + currentOrder.id;
    }
  
    // This function displays a message when there are no orders
    function displayEmpty(id) {
      var query = window.location.search;
      var partial = "";
      if (id) {
        partial = " for Customer #" + id;
      }
      orderContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("No orders yet" + partial + ", navigate <a href='/cms" + query +
      "'>here</a> in order to get started.");
      orderContainer.append(messageH2);
    }
  
  });
  