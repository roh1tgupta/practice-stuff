package frms;

import java.awt.Color;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.HashMap;
import java.util.Map;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPasswordField;
import javax.swing.JTextField;

import com.app.core.User;
import static utils.CollectionUtils.*;
import static javax.swing.JOptionPane.*;

public class LoginRegFrame extends JFrame implements ActionListener {
	private JLabel l1, l2;
	private JTextField email;
	private JPasswordField pass;
	private JButton login, reg;
	private Map<String, User> hm;

	public static void main(String[] args) {
		try {
			LoginRegFrame frm = new LoginRegFrame();
		} catch (Exception e) {
			e.printStackTrace();

		}
	}

	public LoginRegFrame() {
		initGUI();
		initBL();
	}

	private void initGUI() {
		// set title bar of frm
		setTitle("Login Reg Form");
		// set size
		setSize(400, 200);
		// center the frm
		setLocationRelativeTo(null);
		setLayout(new GridLayout(3, 2, 40, 20));
		// create comps
		l1 = new JLabel("Enter Email");

		email = new JTextField(40);
		l2 = new JLabel("Enter Password");
		pass = new JPasswordField(40);
		login = new JButton("Login");
		login.addActionListener(this);
		reg = new JButton("Register Me");
		reg.setEnabled(false);
		add(l1);

		add(email);
		add(l2);
		add(pass);
		add(login);
		add(reg);

		/*
		 * JLabel l1=new JLabel("Hello from Swing",new
		 * ImageIcon("d:/images/ani_marv.gif"),JLabel.CENTER); l1.setFont(new
		 * Font("verdana",Font.BOLD,20));
		 * getContentPane().setBackground(Color.CYAN); add(l1);
		 */ // set def close operation
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setVisible(true);
		System.out.println("init gui by " + Thread.currentThread());

	}

	private void initBL() {
		hm = populateData();
	}

	@Override
	public void actionPerformed(ActionEvent e) {

		System.out.println("ap by " + Thread.currentThread());
		if (e.getSource() == login) {
			// validation
			String em = email.getText();
			String pass1 = new String(pass.getPassword());
			if (hm.containsKey(em)) {
				User u = hm.get(em);
				if (u.getPass().equals(pass1))
					showMessageDialog(this, "Login Successful \n" + u);
				else
					showMessageDialog(this, "Invalid Password , pls retry");
			} else
				showMessageDialog(this, "New User , Pls Register !!!");

		} else {
			// user reg
		}
	}

}
