// Variables globales que estaría bien que estuvieran
// en otro fichero o quizá dentro del scope de init,
// pero asi puedo cambiarlas para probar rápidamente
const loginModalUrl = '/login?layout=modals';
const editModalUrl = '/chunk/edit?layout=modals';
const detailModalUrl = '/chunk/detail?layout=modals';
//const detailModalUrl = 'chunk-view.html?layout=modals';


function init(){
  // Inicializamos Foundation
  // Necesario para varios componentes js que se usan
  // en el front
  $(document).foundation();

  // Ventanas modales
  const $loginModal = $('#login-modal');
  const $chunkModal = $('#chunk-modal');

  // Abre el login en su modal
  $('#login-button').on('click', () => {
    $.ajax({url: loginModalUrl})
    .then( resp =>{
      $loginModal.html(resp).foundation('open');
    })
    .catch(err => console.log(err));
  });

  // Abre los modales de edición

  $('.chunk-edit').on('click', () => {
    let target = $(event.target).attr('data-edit-target');
    $.ajax({url: editModalUrl + '&id=' + target})
      .then(resp => {
        $chunkModal.html(resp).foundation('open');
      })
      .catch(err => console.log(err));
  });

  // Abre los modales de vistas

  $('.chunk-view').on('click', () => {
    let target = $(event.target).attr('data-view-target');
    $.ajax({url: detailModalUrl + '&id=' + target})
      .then(resp => {
        $chunkModal.html(resp).foundation('open');
      })
      .catch(err => console.log(err));
  });

  // Inicializa los modales en links

  $('[data-ajax-open="true"]').on('click', () => {
    event.preventDefault();
    let target = $(event.target).attr('href');
    let param = target.indexOf('?') == -1 ? '?' : '&';
    target = target + param + 'layout=modals';
    $.ajax({url: target})
      .then(resp => {
        $chunkModal.html(resp).foundation('open');
      })
      .catch(err => console.log(err));
  });

  // Inicializamos el highlightjs
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

  //Inicializa los botones de copia

  var clipboard = new Clipboard('.chunk-copy');

  clipboard.on('success', (e) => {
    e.clearSelection();
    $(event.target)
      .parents('.chunk')
      .addClass('copied');
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
  });

  clipboard.on('error', (e) => {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
  });

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

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  //$temp.remove();
}
