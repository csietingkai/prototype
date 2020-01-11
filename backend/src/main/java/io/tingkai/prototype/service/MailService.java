package io.tingkai.prototype.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import io.tingkai.prototype.constant.AppConstants;
import io.tingkai.prototype.controller.AuthController;

@Service
public class MailService {

	private static final String CONFIRM_EMAIL_SUBJECT = "Prototype Confrim Email";
	private static final String CONFIRM_EMAIL_CONTENT = "Click the following link to verify email:\n";

	@Autowired
	private JavaMailSender javaMailSender;

	public void sendConfirmEmail(String destination) {
		// FIXME how to send confirm request
		StringBuilder content = new StringBuilder();
		content.append(CONFIRM_EMAIL_CONTENT);
		content.append(AppConstants.CONFIRM_EMAIL_LINK);
		content.append(AuthController.CONFIRM_PATH);
		content.append("?");
		content.append(destination);
		sendEmail(CONFIRM_EMAIL_SUBJECT, content.toString(), destination);
	}

	private void sendEmail(String subject, String content, String... dests) {
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setTo(dests);

		msg.setSubject(subject);
		msg.setText(content);

		this.javaMailSender.send(msg);
	}
}
