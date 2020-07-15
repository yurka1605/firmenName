let isScroll = false;

$(document).ready(function () {

    $('.mb-4').each((i, el) => {
        const height = $(el).height();
        $(el).height(height);
    });

    $(".input-highlighter")
        .focus(function () {
            $('.disabled').show();
            const el = $(this).parent().parent().children('h5').children('.form-check');
            scrollToBlock(el, $(this));
        })
        .focusout(function () {
            $(".input-highlight-area").hide();
            $(this).parent().parent().removeClass('edit');
        });
    
    $(".block-highlighter label").on('click', function (e) {
        e.preventDefault();
        $('.disabled').show();
        scrollToBlock($(this).parent());
    });

    $(".block-highlighter").hover(
        function () {
            show(this);
        },
        function () {
            $(".block-highlight-area").hide();
        }
    );

    $('.checkbox').click(function () {
        if ($(this).hasClass('grey')) {
            return;
        }
        const input = $(this).parent().prev();
        id = input.data("id");
        const isChecked = input.prop('checked');
        input.prop('checked', !isChecked);
        $(this).toggleClass('checked');
        $("." + id + "--input").prop('disabled', isChecked);
        const parent = $(input).parent().parent().parent();
        if (!isChecked) {
            parent.height(parent[0].scrollHeight - 30);
        } else {
            const height = $(input).parent().parent().height();
            parent.height(height + 5);
        }
    });

    $('form').scroll(() => {
        if (!isScroll) {
            $('input').blur();
        }
    });

    $(window).scroll(() => {
        if (!isScroll) {
            $('input').blur();
        }
    });

    $('.form-check svg').hover(function () {
        const This = $(this).prev();
        This.css('display') === 'none' ? This.show() : This.hide();
    });   
});

// functions
function show (el) {
    id = "area-" + $(el).data("id");
    $(".block-highlight-area").hide();
    $("#" + id).show();
    eval('positionHighlightArea("' + id + '",' + $(el).data("x") + "," + $(el).data("y") + ");");
}

function highlight(el, ) {
    id = "area-" + el.data("id");
        $(".input-highlight-area").hide();
        $("#" + id).show();
        el.parent().parent().addClass('edit');
        eval('positionHighlightArea("' + id + '",' + el.data("x") + "," + el.data("y") + ");");
}

function positionHighlightArea(id, x, y) {
    $("#" + id).position({
        my: "left top",
        at: "left+" + x + " top+" + y,
        of: "#screenshot",
        collision: "none",
    });
}

function scrollToBlock(el, input = undefined) {
    show(el);
    id = "area-" + el.data("id");
    let pos = $("#" + id).offset().top;
    const scrollPos = pos + $("#" + id).offset().height;
    const allPos = window.pageYOffset + document.documentElement.clientHeight;
    const isView = window.pageYOffset < scrollPos && scrollPos < allPos;
    if (isView) {
        $('.disabled').hide();
    } else {
        isScroll = true;
        $("#" + id).hide();
        $('html, body').animate({
            scrollTop: pos - 110
        }, {
            complete: () => {
                $('.disabled').hide();
                input ? highlight(input) : show(el);
                setTimeout(() => {
                    isScroll = false;
                }, 1500);
            },
        }, 800);
    }
}