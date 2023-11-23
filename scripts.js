 
$('.select_sk').click(function () {
    $('.sk_dorpdoen').slideToggle();
    return false;
});
$('.sk_dorpdoen a').click(function () {
    $('.sk_dorpdoen').fadeOut();
    return false;
});

$(document).ready(function () {
    $.ajax({
        url: 'data.json',
        dataType: 'json',
        success: function (data) {  
            for (var i = 0; i < data.length; i++) {
                var employee = data[i];
                var table_data = `<a href="#" class="data_list" data_id="`+ employee.id + `" em_name="`+ employee.name + `">
                                        <ul class="item">
                                            <li><p>`+ employee.id + `</p></li>
                                            <li><p>`+ employee.name + `</p></li>
                                            <li><p>`+ employee.position + `</p></li>
                                            <li><p>`+ employee.department + `</p></li> 
                                        </ul>
                                    </a> `;
                $('.sk_append_data').append(table_data);
            } 
 
        },
        error: function (xhr, status, error) {
            console.error('Error fetching JSON:', status, error);
        }
    });
 
    var selectedResultIndex = -1;

    $(document).on('keyup', '#sk_input_search', function() {
        var searchTerm = $(this).val();
        $('.sk_append_data').html('');
        
        $.ajax({
          url: 'data.json',
          dataType: 'json',
          success: function(data) { 
            var filteredData = data.filter(function(item) {
                return (  
                    item.name.toLowerCase().includes(searchTerm) ||
                    item.position.toLowerCase().includes(searchTerm) ||
                    item.id.toString().includes(searchTerm)
                  );
            });

            console.log()
      
            if (filteredData.length > 0) { 
                var resultHtml = '';
                filteredData.forEach(function(item, index) { 
                    var isSelected = index === selectedResultIndex ? 'selected' : '';
                    resultHtml  += (`<a href="#" class="data_list" data_id="`+ item.id + `" em_name="`+ item.name + `">
                                                <ul class="item">
                                                    <li><p>`+ item.id + `</p></li>
                                                    <li><p>`+ item.name + `</p></li>
                                                    <li><p>`+ item.position + `</p></li>
                                                    <li><p>`+ item.department + `</p></li> 
                                                </ul>
                                            </a> `);
                });
                $('.sk_append_data').html(resultHtml);
              } else {
                
                $('.sk_append_data').html('<b class="not_found">No matches found.</b>'); 
              }
          },
          error: function(xhr, status, error) {
            console.error('Error fetching JSON:', status, error);
          }
        });
      }); 

      
    $(document).on('keydown', '.sk_append_data', function(e) {
        var results = $('.sk_append_data');
        if (results.length === 0) {
        return;
        }

        switch(e.key) {
        case 'ArrowUp':
            e.preventDefault();
            selectedResultIndex = (selectedResultIndex - 1 + results.length) % results.length;
            updateSelectedResult();
            break;
        case 'ArrowDown':
            e.preventDefault();
            selectedResultIndex = (selectedResultIndex + 1) % results.length;
            updateSelectedResult();
            break;
        }
    });

    function updateSelectedResult() {
        var results = $('.sk_append_data .data_list');
        results.removeClass('selected');
        results.eq(selectedResultIndex).addClass('selected');
    }

});


$(document).on('click','.data_list',function(){
    $('.sk_dorpdoen').fadeOut();
    var data_val = $(this).attr('data_id'); 
    var em_name = $(this).attr('em_name'); 
    $('.select_sk').attr('get_data',data_val);
    $('.select_sk').html(em_name); 
})
 