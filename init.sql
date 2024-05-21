CREATE DATABASE IF NOT EXISTS mysystem;
CREATE USER 'your_user'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON mysystem.* TO 'your_user'@'%';
FLUSH PRIVILEGES;