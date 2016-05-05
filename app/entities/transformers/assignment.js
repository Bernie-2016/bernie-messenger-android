const CONTACT_FIRST_NAME_PLACEHOLDER = /\{\{contact\.firstName\}\}/g;

export function transformAssignmentEntity (assignment, contact) {
  if (!contact) {
    return assignment;
  }

  return {
    ...assignment,
    callActions: assignment.callActions.map(transformCallAction(contact)),
    textActions: assignment.textActions.map(transformTextAction(contact))
  };
}

export function transformCallAction ({firstName}) {
  return callAction => ({
    ...callAction,
    callScript: replaceContactPlaceholder(callAction.callScript, firstName)
  });
}

export function transformTextAction ({firstName}) {
  return textAction => ({
    ...textAction,
    messageContent: replaceContactPlaceholder(textAction.messageContent, firstName)
  });
}

export function replaceContactPlaceholder (content, substitution) {
  return content.replace(CONTACT_FIRST_NAME_PLACEHOLDER, substitution);
}
