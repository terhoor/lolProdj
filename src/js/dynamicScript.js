import $ from "jquery";
var dataInfoOrg;

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
        console.log(res);
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
      <a class="nav-link active" data-place="main" href="#main">Главная</a>
    </li>`));

    for (var key in typeName) {
      console.log(dataInfoOrg[key]);
      console.log(key);

      if (dataInfoOrg[key]) {
        var $newItem = $navItem.clone();
        var word = typeName[key].charAt(0).toUpperCase() + typeName[key].slice(1);
        $newItem.find('.js-nav-link').attr('data-place', key).text(word).attr('href', `#${key}`);
        $nav.append($newItem);
      }
    }


  };

  console.log('навигация скрипт');
}());

export function funcDynamic() {
  var hash = $(this).data('place') || window.location.hash.slice(1) || 'main';
  var $dynamicDiv = $('.dynamic-place');

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
      $dynamicDiv.load('main.html .main', function () {

        dataInfoOrg.organization.forEach(function (block) {
          $('.header .header-org').text(block.nameOrganization);
          $('.header .header-doc').text(block.numberDocumentation);
          $('.header .header-status').text(block.statusOrganization);
        });


        dataInfoOrg.director.forEach(function (director) {
          $('.main-people .block-director')
            .find('.surname')
            .text(director.surname).end()
            .find('.name')
            .text(director.name).end()
            .find('.patronymic')
            .text(director.surname);
        });

        dataInfoOrg.responsible.forEach(function (responsible) {
          $('.main-people .block-responsible')
            .find('.surname')
            .text(responsible.surname).end()
            .find('.name')
            .text(responsible.name).end()
            .find('.patronymic')
            .text(responsible.surname).end()
            .find('.telephone')
            .text(responsible.telephone);
        });


      });

      break;

    case 'books':
      $dynamicDiv.load('books.html .books', function () {
        var $booksBlock = $('.block-books');
        var bookStruc = $('.block-book').detach();

        dataInfoOrg.books.forEach(function (book) {
          var $newBook = $(bookStruc).clone();

          $newBook
            .find('.name').text(book.name).end()
            .find('.author').text(book.author).end()
            .find('.publish').text(book.publish).end()
            .find('.year').text(book.year).end();

          $booksBlock.append($newBook);
          $booksBlock.append("</br>");
        });
      });
      break;
    case 'teachers':
      $dynamicDiv.load('teachers.html .teachers', function () {
        var $teachersBlock = $('.block-teachers');
        var $teacherStruc = $('.block-teacher').detach();

        dataInfoOrg.teachers.forEach(function (teacher) {
          var $newTeacher = $($teacherStruc).clone();

          $newTeacher
            .find('.name').text(teacher.name).end()
            .find('.surname').text(teacher.surname).end()
            .find('.patronymic').text(teacher.patronymic).end();

          $teachersBlock.append($newTeacher);
          $teachersBlock.append("</br>");
        });

      });
      break;

    case 'additionalInfo':
      $dynamicDiv.load('additionalInfo.html .additionalInfo', function () {
        var $additionalInfoBlock = $('.block-additionalInfos');
        var $additionalInfoStruc = $('.block-additionalInfo').detach();

        
        dataInfoOrg.additionalInfo.forEach(function (block) {
          var $newInfo = $($additionalInfoStruc).clone();

          $newInfo
            .find('.description').text(block.description);

          $additionalInfoBlock.append($newInfo);
          $additionalInfoBlock.append("</br>");
        });

      });
      break;

    case 'museums':
      $dynamicDiv.load('museums.html .museums', function () {
        var $museumsBlock = $('.block-museums');
        var $museumStruc = $('.block-museum').detach();

        dataInfoOrg.museums.forEach(function (museum) {
          var $newMuseum = $($museumStruc).clone();

          $newMuseum
            .find('.description').text(museum.description).end()
            .find('.exposition').text(museum.exposition).end()
            .find('.head').text(museum.head).end();

          $museumsBlock.append($newMuseum);
        });

      });
      break;

    case 'cabinets':
      $dynamicDiv.load('cabinets.html .cabinets', function () {
        var $cabinetsBlock = $('.block-cabinets');
        var $cabinetStruc = $('.block-cabinet').detach();

        dataInfoOrg.cabinets.forEach(function (cabinet) {
          var $newCabinet = $($cabinetStruc).clone();

          $newCabinet
            .find('.description').text(cabinet.description).end()
            .find('.head').text(cabinet.exposition).end()

          $cabinetsBlock.append($newCabinet);
        });

      });
      break;

    case 'others':
      $dynamicDiv.load('others.html .others', function () {
        var $otherBlock = $('.block-others');
        var $otherStruc = $('.block-other').detach();

        
        dataInfoOrg.others.forEach(function (block) {
          var $newInfo = $($otherStruc).clone();

          $newInfo
            .find('.description').text(block.description);

          $otherBlock.append($newInfo);
          $otherBlock.append("</br>");
        });

      });
      break;

    case 'subjects':
      $dynamicDiv.load('subjects.html .subjects', function () {
        var $subjectsBlock = $('.block-subjects');
        var subjectStruc = $('.block-subject').detach();

        dataInfoOrg.subjects.forEach(function (subject) {
          var $newSubject = $(subjectStruc).clone();

          $newSubject
            .find('.title').text(subject.title).end()
            .find('.level').text(subject.level).end();

          $subjectsBlock.append($newSubject);
          $subjectsBlock.append("</br>");
        });
      });
      break;

    case 'societies':
      $dynamicDiv.load('societies.html .societies', function () {
        var $societiesBlock = $('.block-societies');
        var societyStruc = $('.block-society').detach();

        dataInfoOrg.societies.forEach(function (society) {
          var $newSociety = $(societyStruc).clone();

          $newSociety
            .find('.name').text(society.name).end()
            .find('.class').text(society.class).end()
            .find('.head').text(society.head).end()
            .find('.description').text(society.description).end();

          $societiesBlock.append($newSociety);
          $societiesBlock.append("</br>");
        });
      });
      break;
    case 'collectives':
      $dynamicDiv.load('collectives.html .collectives', function () {
        var $collectivesBlock = $('.block-collectives');
        var collectiveStruc = $('.block-collective').detach();

        dataInfoOrg.collectives.forEach(function (collective) {
          var $newCollective = $(collectiveStruc).clone();

          $newCollective
            .find('.name').text(collective.name).end()
            .find('.ageChildren').text(collective.ageChildren).end()
            .find('.head').text(collective.head).end()
            .find('.description').text(collective.description).end();

          $collectivesBlock.append($newCollective);
          $collectivesBlock.append("</br>");
        });
      });
      break;

    case 'events':
      $dynamicDiv.load('events.html .events', function () {
        var $eventsBlock = $('.block-events');
        var eventStruc = $('.block-event').detach();

        dataInfoOrg.events.forEach(function (event) {
          var $newEvent = $(eventStruc).clone();

          $newEvent
            .find('.name').text(event.name).end()
            .find('.level').text(event.level).end()
            .find('.form').text(event.form).end()
            .find('.date').text(event.date).end();

          $eventsBlock.append($newEvent);
          $eventsBlock.append("</br>");
        });
      });
      break;
  }



}