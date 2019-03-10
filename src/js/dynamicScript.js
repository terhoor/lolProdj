import $ from "jquery";
var dataInfoOrg;

$.fn.addOrDelete = function(nameParam) {
  var property = '';
  for (var param in nameParam) {
    property = nameParam[param];
    if (property) {
      this.find(`.${param}`).text(property);
    }
    else {
      this.find(`.block-${param}`).remove();
    }
  }
  return this;  
};

(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var idOrg = urlParams.get('id');
  if (!idOrg) return;

  dataInfoOrg = function () {
    var res;
    $.ajax({
      url: `http://map.e908476u.beget.tech/api/organizations/${idOrg}`,
      async: false,
      success: function (result) {
        res = JSON.parse(result);
      }
    });
    return res;
  }();

  generateMenu();

  function generateMenu() {
    var typeName;
    $.ajax({
      url: `http://map.e908476u.beget.tech/api/json`,
      async: false,
      success: function (result) {
        typeName = JSON.parse(result);
      }
    });
    var $nav = $('.js-nav');
    var $navItem = $(`
      <li class="nav-item">
        <a class="nav-link js-nav-link" data-place="" href=""></a>
      </li>
    `);

    $nav.append($(`<li class="nav-item">
      <a class="nav-link active js-nav-link" data-place="main" href="#main">Главная</a>
    </li>`));

    for (var key in typeName) {

      if (dataInfoOrg[key]) {
        var $newItem = $navItem.clone();
        var word = typeName[key].charAt(0).toUpperCase() + typeName[key].slice(1);
        $newItem.find('.js-nav-link').attr('data-place', key).text(word).attr('href', `#${key}`);
        $nav.append($newItem);
      }
    }


  };


  hideMenu();
  $(window).resize(function () {
    hideMenu();
  });

}());

function hideMenu() {
  $('.js-nav .js-nav-link').unbind('click');
  if ($(window).width() <= '991') {
    $('.js-nav .js-nav-link').on('click', function() {
      $('.js-btn-collapse').click();
    });
  }
  
}

export function funcDynamic() {
  var hash = $(this).data('place') || window.location.hash.slice(1) || 'main';
  var $dynamicDiv = $('.dynamic-place');
  var $htmlPage;
  $('.js-nav .active').removeClass('active');
  if (this === undefined) {
    $('.js-nav .nav-link').filter(function () {
      return $(this).attr("data-place") === hash
    }
    ).addClass('active');
  } else {
    $(this).addClass('active');
  }

  $('.background-img').css({
    'background': `url(./uploads/${hash}.jpg)`,
    'background-size': 'cover'
  });
  switch (hash) {
    case 'main':
      $htmlPage = $($('#main').html());
      dataInfoOrg.organization.forEach(function (block) {
        $htmlPage.addOrDelete(block);
      });


      dataInfoOrg.director.forEach(function (director) {
      $htmlPage.find('.main-people .block-director').addOrDelete(director);
      });

      dataInfoOrg.responsible.forEach(function (responsible) {
      $htmlPage.find('.main-people .block-responsible').addOrDelete(responsible);
      });
      

      break;

    case 'books':
      $htmlPage = $($('#books').html());
      var $booksBlock = $htmlPage.find('.block-books');
      var bookStruc = $booksBlock.find('.my-col').detach();

      dataInfoOrg.books.forEach(function (book) {
        var $newBook = $(bookStruc).clone();

        $newBook.addOrDelete(book);
        $booksBlock.append($newBook);
        $booksBlock.append("</br>");
      });

      break;
    case 'teachers':
      $htmlPage = $($('#teachers').html());
      var $teachersBlock = $htmlPage.find('.block-teachers');
      var $teacherStruc = $teachersBlock.find('.my-col-teachers').detach();

      dataInfoOrg.teachers.forEach(function (teacher) {
        var $newTeacher = $($teacherStruc).clone();

        $newTeacher.addOrDelete(teacher);
        $teachersBlock.append($newTeacher);
        $teachersBlock.append("</br>");
      });

      break;

    case 'additionalInfo':
      $htmlPage = $($('#additionalInfo').html());

      var $additionalInfoBlock = $htmlPage.find('.block-additionalInfos');
      var $additionalInfoStruc = $additionalInfoBlock.find('.my-col').detach();


      dataInfoOrg.additionalInfo.forEach(function (block) {
        var $newInfo = $($additionalInfoStruc).clone();

        $newInfo
          .find('.description').text(block.description);

        $additionalInfoBlock.append($newInfo);
        $additionalInfoBlock.append("</br>");
      });

      break;

    case 'museums':
      $htmlPage = $($('#museums').html());

      var $museumsBlock = $htmlPage.find('.block-museums');
      var $museumStruc = $museumsBlock.find('.my-col').detach();

      dataInfoOrg.museums.forEach(function (museum) {
        var $newMuseum = $($museumStruc).clone();

        $newMuseum.addOrDelete(museum);
        $museumsBlock.append($newMuseum);
      });

      break;

    case 'cabinets':
      $htmlPage = $($('#cabinets').html());

      var $cabinetsBlock = $htmlPage.find('.block-cabinets');
      var $cabinetStruc = $cabinetsBlock.find('.my-col').detach();

      dataInfoOrg.cabinets.forEach(function (cabinet) {
        var $newCabinet = $($cabinetStruc).clone();

        $newCabinet.addOrDelete(cabinet);
        $cabinetsBlock.append($newCabinet);
      });

      break;

    case 'others':
      $htmlPage = $($('#others').html());

      var $otherBlock = $htmlPage.find('.block-others');
      var $otherStruc = $otherBlock.find('.my-col').detach();


      dataInfoOrg.others.forEach(function (block) {
        var $newInfo = $($otherStruc).clone();

        $newInfo
          .find('.description').text(block.description);
        $otherBlock.append($newInfo);
        $otherBlock.append("</br>");
      });

      break;

    case 'subjects':
      $htmlPage = $($('#subjects').html());

      var $subjectsBlock = $htmlPage.find('.block-subjects');
      var subjectStruc = $subjectsBlock.find('.my-col').detach();

      dataInfoOrg.subjects.forEach(function (subject) {
        var $newSubject = $(subjectStruc).clone();

        $newSubject.addOrDelete(subject);
        $subjectsBlock.append($newSubject);
        $subjectsBlock.append("</br>");
      });
      break;

    case 'societies':
      $htmlPage = $($('#societies').html());
      var $societiesBlock = $htmlPage.find('.block-societies');
      var societyStruc = $societiesBlock.find('.my-col').detach();

      dataInfoOrg.societies.forEach(function (society) {
        var $newSociety = $(societyStruc).clone();

        $newSociety.addOrDelete(society);
        $societiesBlock.append($newSociety);
        $societiesBlock.append("</br>");
      });

      break;
    case 'collectives':
      $htmlPage = $($('#collectives').html());

      var $collectivesBlock = $htmlPage.find('.block-collectives');
      var collectiveStruc = $collectivesBlock.find('.my-col').detach();

      dataInfoOrg.collectives.forEach(function (collective) {
        var $newCollective = $(collectiveStruc).clone();

        $newCollective.addOrDelete(collective);
        $collectivesBlock.append($newCollective);
        $collectivesBlock.append("</br>");
      });
      break;

    case 'events':
      $htmlPage = $($('#events').html());
      var $eventsBlock = $htmlPage.find('.block-events');
      var eventStruc = $eventsBlock.find('.my-col').detach();

      dataInfoOrg.events.forEach(function (event) {
        var $newEvent = $(eventStruc).clone();

        $newEvent.addOrDelete(event);
        $eventsBlock.append($newEvent);
        $eventsBlock.append("</br>");
      });
      break;

    case 'methodologs':
      $htmlPage = $($('#methodologs').html());
      var $methodologsBlock = $htmlPage.find('.block-methodologs');
      var methodologStruc = $methodologsBlock.find('.my-col').detach();

      dataInfoOrg.methodologs.forEach(function (methodolog) {
        var $newMethodolog = $(methodologStruc).clone();

        $newMethodolog.addOrDelete(methodolog);
        $methodologsBlock.append($newMethodolog);
        $methodologsBlock.append("</br>");
      });

      break;

    case 'openClassrooms':
      $htmlPage = $($('#openClassrooms').html());
      var $openClassroomsBlock = $htmlPage.find('.block-openClassrooms');
      var openClassroomStruc = $openClassroomsBlock.find('.my-col').detach();

      dataInfoOrg.openClassrooms.forEach(function (openClassroom) {
        var $newopenClassroom = $(openClassroomStruc).clone();

        $newopenClassroom.addOrDelete(openClassroom);
        $openClassroomsBlock.append($newopenClassroom);
        $openClassroomsBlock.append("</br>");
      });

      break;

  }

  $dynamicDiv.empty();
  $dynamicDiv.append($htmlPage);


  
}