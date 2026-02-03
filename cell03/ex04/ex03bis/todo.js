$(function () {
    const $ftList = $('#ft_list');
    const $newBtn = $('#new');

    // โหลด todo จาก cookie ตอนเปิดหน้า
    $(window).on('load', loadTodos);

    // ปุ่ม New
    $newBtn.on('click', function () {
        const text = prompt('Enter a new TO DO:');
        if (text && text.trim() !== '') {
            addTodo(text.trim());
            saveTodos();
        }
    });

    // เพิ่ม TO DO
    function addTodo(text, fromLoad = false) {
        const $div = $('<div>').text(text);

        $div.on('click', function () {
            if (confirm('Do you want to remove this TO DO?')) {
                $div.remove();
                saveTodos();
            }
        });

        if (fromLoad) {
            $ftList.append($div); // รักษาลำดับเดิม
        } else {
            $ftList.prepend($div); // todo ใหม่อยู่บนสุด
        }
    }


    // บันทึก todo ลง cookie
    function saveTodos() {
        const todos = [];
        $ftList.find('div').each(function () {
            todos.push($(this).text());
        });
        document.cookie = 'todos=' + encodeURIComponent(JSON.stringify(todos)) + '; path=/';
    }

    // โหลด todo จาก cookie
    function loadTodos() {
        const cookies = document.cookie.split('; ');
        const todoCookie = cookies.find(c => c.startsWith('todos='));

        if (!todoCookie) return;

        const todos = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
        todos.forEach(todo => addTodo(todo, true));
    }
});