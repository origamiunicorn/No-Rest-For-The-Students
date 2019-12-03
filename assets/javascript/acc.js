// Accordion JS below
$(".accordion").on("click", ".accordion-header", function () {
    $(this).toggleClass("active").next().slideToggle();
});