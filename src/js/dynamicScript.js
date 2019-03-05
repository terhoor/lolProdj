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

      if (dataInfoOrg[key]) {
        var $newItem = $navItem.clone();
        var word = typeName[key].charAt(0).toUpperCase() + typeName[key].slice(1);
        $newItem.find('.js-nav-link').attr('data-place', key).text(word).attr('href', `#${key}`);
        $nav.append($newItem);
      }
    }


  };

}());

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
        $htmlPage.find('.header .header-org').text(block.nameOrganization);
        $htmlPage.find('.header .header-doc').text(block.numberDocumentation);
        $htmlPage.find('.header .header-status').text(block.statusOrganization);
      });


      dataInfoOrg.director.forEach(function (director) {
        $htmlPage.find('.main-people .block-director')
          .find('.surname')
          .text(director.surname).end()
          .find('.name')
          .text(director.name).end()
          .find('.patronymic')
          .text(director.surname);
      });

      dataInfoOrg.responsible.forEach(function (responsible) {
        $htmlPage.find('.main-people .block-responsible')
          .find('.surname')
          .text(responsible.surname).end()
          .find('.name')
          .text(responsible.name).end()
          .find('.patronymic')
          .text(responsible.surname).end()
          .find('.telephone')
          .text(responsible.telephone);
      });

      break;

    case 'books':
      $htmlPage = $($('#books').html());
      var $booksBlock = $htmlPage.find('.block-books');
      var bookStruc = $booksBlock.find('.block-book').detach();

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

      break;
    case 'teachers':
      $htmlPage = $($('#teachers').html());
      var $teachersBlock = $htmlPage.find('.block-teachers');
      var $teacherStruc = $teachersBlock.find('.block-teacher').detach();

      dataInfoOrg.teachers.forEach(function (teacher) {
        var $newTeacher = $($teacherStruc).clone();

        $newTeacher
          .find('.name').text(teacher.name).end()
          .find('.surname').text(teacher.surname).end()
          .find('.patronymic').text(teacher.patronymic).end();

        $teachersBlock.append($newTeacher);
        $teachersBlock.append("</br>");
      });

      break;

    case 'additionalInfo':
      $htmlPage = $($('#additionalInfo').html());

      var $additionalInfoBlock = $htmlPage.find('.block-additionalInfos');
      var $additionalInfoStruc = $additionalInfoBlock.find('.block-additionalInfo').detach();


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
      var $museumStruc = $museumsBlock.find('.block-museum').detach();

      dataInfoOrg.museums.forEach(function (museum) {
        var $newMuseum = $($museumStruc).clone();

        $newMuseum
          .find('.description').text(museum.description).end()
          .find('.exposition').text(museum.exposition).end()
          .find('.head').text(museum.head).end();

        $museumsBlock.append($newMuseum);
      });

      break;

    case 'cabinets':
      $htmlPage = $($('#cabinets').html());

      var $cabinetsBlock = $htmlPage.find('.block-cabinets');
      var $cabinetStruc = $cabinetsBlock.find('.block-cabinet').detach();

      dataInfoOrg.cabinets.forEach(function (cabinet) {
        var $newCabinet = $($cabinetStruc).clone();

        $newCabinet
          .find('.description').text(cabinet.description).end()
          .find('.head').text(cabinet.exposition).end()

        $cabinetsBlock.append($newCabinet);
      });

      break;

    case 'others':
      $htmlPage = $($('#others').html());

      var $otherBlock = $htmlPage.find('.block-others');
      var $otherStruc = $otherBlock.find('.block-other').detach();


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
      var subjectStruc = $subjectsBlock.find('.block-subject').detach();

      dataInfoOrg.subjects.forEach(function (subject) {
        var $newSubject = $(subjectStruc).clone();

        $newSubject
          .find('.title').text(subject.title).end()
          .find('.level').text(subject.level).end();

        $subjectsBlock.append($newSubject);
        $subjectsBlock.append("</br>");
      });
      break;

    case 'societies':
      $htmlPage = $($('#societies').html());
      var $societiesBlock = $htmlPage.find('.block-societies');
      var societyStruc = $societiesBlock.find('.block-society').detach();

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

      break;
    case 'collectives':
      $htmlPage = $($('#collectives').html());

      var $collectivesBlock = $htmlPage.find('.block-collectives');
      var collectiveStruc = $collectivesBlock.find('.block-collective').detach();

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
      break;

    case 'events':
      $htmlPage = $($('#events').html());
      var $eventsBlock = $htmlPage.find('.block-events');
      var eventStruc = $eventsBlock.find('.block-event').detach();

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
      break;

  }

  $dynamicDiv.empty();
  $dynamicDiv.append($htmlPage);

}