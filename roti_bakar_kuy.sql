-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2024 at 01:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `roti_bakar_kuy`
--

-- --------------------------------------------------------

--
-- Table structure for table `keranjang`
--

CREATE TABLE `keranjang` (
  `id_keranjang` int(11) NOT NULL,
  `nomor_telepon` varchar(13) NOT NULL,
  `roti` varchar(20) NOT NULL,
  `ukuran` varchar(20) NOT NULL,
  `rasa` varchar(20) NOT NULL,
  `topping` varchar(20) DEFAULT NULL,
  `jumlah` int(2) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int(11) NOT NULL,
  `nomor_telepon` varchar(13) NOT NULL,
  `kode_unik` int(3) NOT NULL,
  `pesanan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`pesanan`)),
  `status` enum('Lunas','Belum Lunas') NOT NULL DEFAULT 'Belum Lunas'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id`, `nomor_telepon`, `kode_unik`, `pesanan`, `status`) VALUES
(10, '6281356808990', 320, '{\"pesanan\": [{\"roti\": \"Polos\", \"ukuran\": \"Large\", \"rasa\": \"Coklat\", \"topping\": null, \"jumlah\": 1, \"total\": 14000}], \"total\": 14000}', 'Belum Lunas'),
(12, '6281356808990', 14, '{\"pesanan\": [{\"roti\": \"Pastry\", \"ukuran\": \"Large\", \"rasa\": \"Coklat\", \"topping\": null, \"jumlah\": 1, \"total\": 18000}, {\"roti\": \"Pastry\", \"ukuran\": \"Large\", \"rasa\": \"Keju\", \"topping\": null, \"jumlah\": 1, \"total\": 19000}], \"total\": 37000}', 'Belum Lunas'),
(15, '6281356808990', 855, '{\"pesanan\": [{\"roti\": \"Pastry\", \"ukuran\": \"Large\", \"rasa\": \"Blueberry\", \"topping\": null, \"jumlah\": 1, \"total\": 17000}, {\"roti\": \"Polos\", \"ukuran\": \"Small\", \"rasa\": \"Coklat\", \"topping\": \"Oreo\", \"jumlah\": 1, \"total\": 12000}, {\"roti\": \"Pastry\", \"ukuran\": \"Large\", \"rasa\": \"Tiramisu\", \"topping\": \"Kacang\", \"jumlah\": 1, \"total\": 21000}], \"total\": 50000}', 'Belum Lunas'),
(16, '6289561660296', 324, '{\"pesanan\": [{\"roti\": \"Polos\", \"ukuran\": \"Small\", \"rasa\": \"Blueberry\", \"topping\": \"Kacang\", \"jumlah\": 4, \"total\": 48000}], \"total\": 48000}', 'Lunas'),
(17, '6281356808990', 658, '{\"pesanan\": [{\"roti\": \"Polos\", \"ukuran\": \"Large\", \"rasa\": \"Coklat\", \"topping\": \"Oreo\", \"jumlah\": 1, \"total\": 16000}, {\"roti\": \"Pastry\", \"ukuran\": \"Large\", \"rasa\": \"Keju\", \"topping\": \"Oreo\", \"jumlah\": 3, \"total\": 42000}], \"total\": 58000}', 'Belum Lunas');

-- --------------------------------------------------------

--
-- Stand-in structure for view `trx_home`
-- (See below for the actual view)
--
CREATE TABLE `trx_home` (
`id` int(11)
,`nama` varchar(255)
,`nomor_telepon` varchar(13)
,`kode_unik` int(3)
,`pesanan` longtext
,`status` enum('Lunas','Belum Lunas')
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `no_telepon` varchar(13) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('Admin','Pengguna') NOT NULL DEFAULT 'Pengguna'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`no_telepon`, `nama`, `password`, `status`) VALUES
('6281356808990', 'Jessica Veranda', 'test', 'Pengguna'),
('6281389905680', 'Charles Daniel', 'test', 'Admin'),
('6289561660296', 'Atha', 'atha123', 'Pengguna');

-- --------------------------------------------------------

--
-- Structure for view `trx_home`
--
DROP TABLE IF EXISTS `trx_home`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `trx_home`  AS SELECT `a`.`id` AS `id`, `b`.`nama` AS `nama`, `a`.`nomor_telepon` AS `nomor_telepon`, `a`.`kode_unik` AS `kode_unik`, `a`.`pesanan` AS `pesanan`, `a`.`status` AS `status` FROM (`transaksi` `a` left join `users` `b` on(`a`.`nomor_telepon` = `b`.`no_telepon`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `keranjang`
--
ALTER TABLE `keranjang`
  ADD PRIMARY KEY (`id_keranjang`),
  ADD KEY `nomor_telepon` (`nomor_telepon`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_unik` (`kode_unik`),
  ADD KEY `nomor_telepon` (`nomor_telepon`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`no_telepon`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `keranjang`
--
ALTER TABLE `keranjang`
  MODIFY `id_keranjang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `keranjang`
--
ALTER TABLE `keranjang`
  ADD CONSTRAINT `keranjang_ibfk_1` FOREIGN KEY (`nomor_telepon`) REFERENCES `users` (`no_telepon`);

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`nomor_telepon`) REFERENCES `users` (`no_telepon`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
