// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable( {
    language: {
        search: "_INPUT_",
        searchPlaceholder: "Search"
    }
  });
});
