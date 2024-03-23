const username = sessionStorage.getItem('username');
if (!username) {
  window.location.href = 'login.html';
}

$(document).ready(function() {
  var username = sessionStorage.getItem('username');
  if (username) {
    $('#usernameDisplay').text(username);
  }
});

$(document).ready(function() {
  var mahasiswaData = JSON.parse(localStorage.getItem('mahasiswaData')) || [];

  function simpanDataMahasiswa() {
    localStorage.setItem('mahasiswaData', JSON.stringify(mahasiswaData));
  }

  function tampilkanDataMahasiswa() {
    $('#tableBody').empty();
    mahasiswaData.forEach(function(mahasiswa) {
      $('#tableBody').append('<tr><td>' + mahasiswa.nim + '</td><td>' + mahasiswa.nama + '</td><td>' + mahasiswa.alamat + '</td><td><button class="btn btn-primary btn-sm editBtn mr-1">Edit</button><button class="btn btn-danger btn-sm deleteBtn">Delete</button></td></tr>');
    });
  }

  $("#addForm").submit(function(event) {
    event.preventDefault();
    var nim = $("#nimInput").val();
    var nama = $("#namaInput").val();
    var alamat = $("#alamatInput").val();
    if (nim && nama && alamat) {
      mahasiswaData.push({ nim: nim, nama: nama, alamat: alamat });
      simpanDataMahasiswa();
      tampilkanDataMahasiswa();
      $("#nimInput").val("");
      $("#namaInput").val("");
      $("#alamatInput").val("");
      showSuccessAlert("Added! Mahasiswa Baru Telah Ditambahkan.");
    } else {
      showErrorAlert("Warning! Tidak Dapat Menambah Mahasiswa.");
    }
  });

  $(document).ready(function() {
    function displayTime() {
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      var seconds = now.getSeconds();

      var timeString = ("0" + hours).slice(-2) + ":" +
        ("0" + minutes).slice(-2) + ":" +
        ("0" + seconds).slice(-2);

      document.getElementById("clock").textContent = timeString;
    }

    setInterval(displayTime, 1000);
  });

  function showAlert(message, alertType) {
    $("#alertMessage").text(message);
    $("#alertBox").removeClass("alert-success alert-danger").addClass(alertType).addClass("show");
  }

  function showSuccessAlert(message) {
    showAlert(message, "alert-success");
    setTimeout(function() {
      $("#alertBox").removeClass("show");
    }, 3000);
  }

  function showErrorAlert(message) {
    showAlert(message, "alert-danger");
  }

  $(document).on("click", ".deleteBtn", function() {
    var rowIndex = $(this).closest("tr").index();
    mahasiswaData.splice(rowIndex, 1);
    simpanDataMahasiswa();
    tampilkanDataMahasiswa();
    showSuccessAlert("Deleted! Data Mahasiswa Berhasil Dihapus.");
  });

  $(document).on("click", ".editBtn", function() {
    var rowIndex = $(this).closest("tr").index();
    var mahasiswa = mahasiswaData[rowIndex];
    $("#editNimInput").val(mahasiswa.nim);
    $("#editNamaInput").val(mahasiswa.nama);
    $("#editAlamatInput").val(mahasiswa.alamat);
    $("#editModal").modal("show");

    $("#saveChangesBtn").click(function() {
      mahasiswa.nama = $("#editNamaInput").val();
      mahasiswa.alamat = $("#editAlamatInput").val();
      simpanDataMahasiswa();
      tampilkanDataMahasiswa();
      $("#editModal").modal("hide");
      showSuccessAlert("Updated! Data Mahasiswa Berhasil Di Perbaharui.");
    });
  });

  tampilkanDataMahasiswa();

  var totalMahasiswa = 0;
  var entriesPerPage = 10;
  var currentPage = 1;

  $("#resetBtn").click(function() {
    $("#nimInput").val("");
    $("#namaInput").val("");
    $("#alamatInput").val("");
  });

  $(document).on("click", ".deleteBtn", function() {
    $(this).closest("tr").remove();
  });

  function showEntries(selectedEntries) {
    $("#tableBody tr").hide();
    var startIndex = (currentPage - 1) * selectedEntries;
    var endIndex = startIndex + parseInt(selectedEntries);
    $("#tableBody tr").slice(startIndex, endIndex).show();
  }

  function setEntriesOptions(totalEntries) {
    var $select = $("#showEntries");
    $select.empty();
    for (var i = 1; i <= totalEntries; i++) {
      $select.append("<option value='" + i + "'>" + i + "</option>");
    }

    $select.change(function() {
      showEntries($(this).val());
    });
  }

  function createPreviousButton() {
    $("<li class='page-item'><a class='page-link pagination-btn' href='#'>Previous</a></li>").appendTo("#pagination");
  }

  function createNextButton() {
    $("<li class='page-item'><a class='page-link pagination-btn' href='#'>Next</a></li>").appendTo("#pagination");
  }

  totalMahasiswa = 10;
  setEntriesOptions(totalMahasiswa);
  showEntries($("#showEntries").val());

  createPreviousButton();
  createNextButton();

  $(document).on("click", ".pagination-btn:contains('Previous')", function() {
    if (currentPage > 1) {
      currentPage--;
      showEntries($("#showEntries").val());
    }
  });

  $(document).on("click", ".pagination-btn:contains('Next')", function() {
    var maxPages = Math.ceil(totalMahasiswa / $("#showEntries").val());
    if (currentPage < maxPages) {
      currentPage++;
      showEntries($("#showEntries").val());
    }
  });
});

$(document).ready(function() {
  var mahasiswaData = JSON.parse(localStorage.getItem('mahasiswaData')) || [];

  function simpanDataMahasiswa() {
    localStorage.setItem('mahasiswaData', JSON.stringify(mahasiswaData));
  }

  function tampilkanDataMahasiswa(data) {
    $('#tableBody').empty();
    data.forEach(function(mahasiswa) {
      $('#tableBody').append('<tr ><td>' + mahasiswa.nim + '</td><td>' + mahasiswa.nama + '</td><td>' + mahasiswa.alamat + '</td><td><button class="btn btn-warning btn-sm editBtn mr-1">Edit</button><button class="btn btn-danger btn-sm deleteBtn">Delete</button></td></tr>');
    });
  }

  $("#searchButton").on("click", function() {
    var keyword = $("#searchInput").val();
    var searchResults = searchMahasiswa(keyword);
    tampilkanDataMahasiswa(searchResults);
  });

  $("#searchInput").on("input", function() {
    var keyword = $(this).val();
    var searchResults = searchMahasiswa(keyword);
    tampilkanDataMahasiswa(searchResults);
  });
        
  function searchMahasiswa(keyword) {
    var results = mahasiswaData.filter(function(mahasiswa) {
      return mahasiswa.nim.includes(keyword);
    });
    return results;
  }

});

function bersihin(){
  localStorage.clear()
}