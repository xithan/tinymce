configure({
  sources: [
    source('amd', 'tinymce.plugins.nonbreaking', '../../src/main/js', function (id) {
      return mapper.hierarchical(id).replace(/^tinymce\/plugins\/nonbreaking\//, '');
    })
  ]
});