export const phone_or_email_regex: RegExp = RegExp(
  '^09(1[0-9]|3[1-9]|0[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$|^[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]{2,4}$',
);
export const phone_regex: RegExp = RegExp(
  '^09(1[0-9]|3[1-9]|0[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$',
);
export const phone_regex_no_zero: RegExp = RegExp(
  '09(1[0-9]|3[1-9]|0[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}|9(1[0-9]|3[1-9]|0[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}',
);
