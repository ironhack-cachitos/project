const loginModalUrl = '/login?layout=modals';
const editModalUrl = '/chunk/edit?layout=modals';
const detailModalUrl = '/chunk/detail?layout=modals';
const randomUrl = '/random?layout=modals';

function init(){
  // Inicializamos Foundation
  // Necesario para varios componentes js que se usan
  // en el front
  $(document).foundation();

  // Ventanas modales

  const $loginModal = $('#login-modal');
  const $chunkModal = $('#chunk-modal');

  // Abre los modales de edición
  $(document).on('click', '.chunk-edit', event => {
    let target = $(event.target).attr('data-edit-target');
    $.ajax({url: editModalUrl + '&id=' + target})
      .then(resp => {
        $chunkModal.html(resp).foundation('open').trigger('ajaxLoaded');
      })
      .catch(err => console.log(err));
  });

  // Abre los modales de vistas
  $(document).on('click', '.chunk-view', event => {
    let target = $(event.target).attr('data-view-target');
    $.ajax({url: detailModalUrl + '&id=' + target})
      .then(resp => {
        $chunkModal.html(resp).foundation('open').trigger('ajaxLoaded');
      })
      .catch(err => console.log(err));
  });

  // Inicializa los modales en links
  $(document).on('click', '[data-ajax-open="true"]', event => {
    event.preventDefault();
    let target = $(event.target).attr('href');
    let param = target.indexOf('?') == -1 ? '?' : '&';
    target = target + param + 'layout=modals';
    $.ajax({url: target})
      .then(resp => {
        $chunkModal.html(resp).foundation('open').trigger('ajaxLoaded');
      })
      .catch(err => console.log(err));
  });


  // Inicializa el highlightjs en las modales ajax
  $(document).on('ajaxLoaded', event => {
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  });
  // Y en el page load de las demás vistas
  hljs.initHighlighting();

  //Inicializa los botones de copia
  var clipboard = new Clipboard('.chunk-copy');

  clipboard.on('success', event => {
    $(event.target).parents('.chunk').addClass('copied');
    console.info('Copied!:', event.text);
    event.clearSelection();
  });

  clipboard.on('error', event => {
    console.error('Action:', event.action);
  });

  // Limpiamos la clase de copies en el mouseleave y blur
  // en todos los Botones de copia
  $(document).on('mouseleave', '.chunk-copy', event => {
    $(event.target).parents('.chunk').removeClass('copied');
  });

  if ($('#random-chunk')) {
    $.ajax({url: randomUrl})
      .then(resp => {
        $('#random-chunk').html(resp).trigger('ajaxLoaded');
      })
      .catch(err => console.log(err));
  }
}

$(document).ready(init);
