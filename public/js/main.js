function copyToClipboard(element) {
  var $temp = $("<input type='hidden'>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}

function init(){
  // Inicializamos Foundation
  $(document).foundation();

  // Modales
  const $loginModal = $('#login-modal');
  const $chunkModal = $('#chunk-modal');

  // Abre el login en su modal
  $('#login-button').on('click', () => {
    $.ajax({url: '/login/modal'}).
    then( resp =>{
      $loginModal.html(resp).foundation('open');
    })
    .catch(e => console.log(err));
  });


  // Inicializamos el highlightjs
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });


  // Abre los modales de edición

  $('.chunk-edit').on('click', () => {
    let target = $(event.target).attr('data-edit-target');
    $.ajax(`chunk-edit.html?${target}`)
      .done((resp) => {
        $chunkModal.html(resp).foundation('open');
      });
  });

  // Abre los modales de vistas

  $('.chunk-view').on('click', () => {
    let target = $(event.target).attr('data-view-target');
    $.ajax(`chunk-view.html?${target}`)
      .done((resp) => {
        $chunkModal.html(resp).foundation('open');
      });
  });

  //Inicializa los botones de copia

  // var clipboard = new Clipboard('.chunk-copy');
  //
  // clipboard.on('success', (e) => {
  //   e.clearSelection();
  //   $(event.target)
  //     .parents('.chunk')
  //     .addClass('copied');
  //   console.info('Action:', e.action);
  //   console.info('Text:', e.text);
  //   console.info('Trigger:', e.trigger);
  // });
  //
  // clipboard.on('error', (e) => {
  //     console.error('Action:', e.action);
  //     console.error('Trigger:', e.trigger);
  // });

  // Limpiamos la clase de copies en el mouseleave y blur
  // en todos los Botones de copia

  $('.chunk-copy')
    .on('mouseleave', () => {
      $(event.target)
        .parents('.chunk')
        .removeClass('copied');
    });
}

$(document).ready(init);
