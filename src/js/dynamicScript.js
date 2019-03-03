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
        console.log(typeName);
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
      if (dataInfoOrg[key].length) {
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
  $('.js-nav .active').removeClass('active');
  if (this === undefined) {
    $('.js-nav .nav-link').filter(function () {
      return $(this).attr("data-place") === hash
    }
    ).addClass('active');
  } else {
    $(this).addClass('active');
  }

  var $dynamicDiv = $('.dynamic-place');
  if (hash === 'books') {
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


  } else if (hash === 'main') {
    $dynamicDiv.load('main.html .main', function () {
      $('.header .header-org').text(dataInfoOrg.organization.nameOrganization);
      $('.header .header-doc').text(dataInfoOrg.organization.numberDocumentation);
      $('.main-people .block-director')
        .find('.surname')
        .text(dataInfoOrg.director.surname).end()
        .find('.name')
        .text(dataInfoOrg.director.name).end()
        .find('.patronymic')
        .text(dataInfoOrg.director.surname);

      $('.main-people .block-responsible')
        .find('.surname')
        .text(dataInfoOrg.responsible.surname).end()
        .find('.name')
        .text(dataInfoOrg.responsible.name).end()
        .find('.patronymic')
        .text(dataInfoOrg.responsible.surname).end()
        .find('.telephone')
        .text(dataInfoOrg.responsible.telephone);

    });


  }

  $dynamicDiv.empty();

}