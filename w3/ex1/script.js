$(function() {

  var data;
  var $groups = $("#groupselector");
  var $members = $("#memberselector");
  var $admintext = $("#admintext");
  var $admin = $("#adminofgroup");

  function addGroupsToSelectList() {
    $.each(data, function(i,elem) {
      $groups.append("<option>" + elem.name + "</option>");
    });
  }

  function showMembers() {
    console.log("test");
    var selectedGroup = $groups.children("option").filter(":selected").text();
    if (selectedGroup == "Select a research group") {
      $members.hide();
      $admintext.hide();
    } else {
      $members.empty();
      $members.append("<option selected>Select a member</option>");
      $.each(data, function(i, elem) { 
        if (elem.name == selectedGroup) {
          $.each(elem.members, function(i, member) {
            $members.append("<option>" + member + "</option>");
          });
          $admin.text(elem.admin);
          $members.show();
          $admintext.show();
        }
      });
    }
  }


  $.getJSON("groups.json", function(json) {
    data = json;
    addGroupsToSelectList();
    $groups.on("change", showMembers);

  });
});
