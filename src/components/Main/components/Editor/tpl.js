import template from 'lodash.template';

const JQuery = `function getInfo() {
  const result = {
    isExist: $('<%= name %>').length > 0,
  };

  if (!result.isExist) {
    return result;
  }
<% if (type.text) { %>
  result.text = $.trim($('<%= name %>').text())<% } %>
<% if (type.length) { %>
  result.length = $('<%= name %>').children().length<% } %>

  return result;
}`;

const utils = `function getInfo() {
  const result = {
    isExist: useJquery.isExist('<%= name %>'),
  };

  if (!result.isExist) {
    return result;
  }
<% if (type.text) { %>
  result.text = useJquery.getText('<%= name %>');<% } %>
<% if (type.length) { %>
  result.length = useJquery.getTotal('<%= name %>');
<% } %>

  return result;
}`;

class JQueryTpl {
  constructor(type) {
    this.type = type;
  }

  run(name) {
    const res = template(JQuery);
    return res({ name, type: this.type });
  }
}

class UtilsTpl {
  constructor(type) {
    this.type = type;
  }

  run(name) {
    const res = template(utils);
    return res({ name, type: this.type });
  }
}

export class Tpl {
  constructor(frame = 2, name = 'body', type) {
    this.name = name;
    if (frame === 1) {
      this.frameTpl = new JQueryTpl(type);
    } else {
      this.frameTpl = new UtilsTpl(type);
    }
  }

  run() {
    return this.frameTpl.run(this.name);
  }
}
