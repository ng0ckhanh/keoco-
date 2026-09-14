import { Question } from '../types';

export const QUESTION_CATEGORIES = [
  'Tất cả',
  'Lịch sử & Địa lý',
  'Khoa học & Tự nhiên',
  'Đố vui & Dân gian',
  'Toán học & Logic',
  'Văn hóa & Đời sống'
] as const;

export const INITIAL_QUESTIONS: Question[] = [
  // --- LỊCH SỬ & ĐỊA LÝ ---
  {
    id: 'geo_01',
    category: 'Lịch sử & Địa lý',
    question: 'Đỉnh núi nào được mệnh danh là "Nóc nhà Đông Dương"?',
    options: ['Fansipan', 'Bạch Mộc Lương Tử', 'Pu Si Lung', 'Tây Côn Lĩnh'],
    correctIndex: 0,
    explanation: 'Đỉnh Fansipan cao 3.143m tại dãy Hoàng Liên Sơn, Lào Cai, là đỉnh núi cao nhất 3 nước Đông Dương.',
    difficulty: 'easy'
  },
  {
    id: 'geo_02',
    category: 'Lịch sử & Địa lý',
    question: 'Chiến thắng Điện Biên Phủ "lừng lẫy năm châu, chấn động địa cầu" diễn ra vào năm nào?',
    options: ['1945', '1954', '1968', '1975'],
    correctIndex: 1,
    explanation: 'Chiến dịch Điện Biên Phủ kết thúc thắng lợi ngày 7/5/1954, chấm dứt ách thống trị của thực dân Pháp.',
    difficulty: 'easy'
  },
  {
    id: 'geo_03',
    category: 'Lịch sử & Địa lý',
    question: 'Sông Mê Kông khi chảy vào lãnh thổ Việt Nam chia thành mấy nhánh chính trước khi đổ ra biển?',
    options: ['2 nhánh chính', '5 nhánh chính', '7 nhánh chính', '9 nhánh chính (Cửu Long)'],
    correctIndex: 3,
    explanation: 'Sông Mê Kông chia thành sông Tiền và sông Hậu rồi đổ ra biển qua các cửa sông, nên được gọi là Cửu Long.',
    difficulty: 'medium'
  },
  {
    id: 'geo_04',
    category: 'Lịch sử & Địa lý',
    question: 'Ai là vị vua sáng lập ra triều đại nhà Lý và dời đô về Thăng Long năm 1010?',
    options: ['Lý Thường Kiệt', 'Lý Công Uẩn (Lý Thái Tổ)', 'Lý Thánh Tông', 'Lý Nhân Tông'],
    correctIndex: 1,
    explanation: 'Vua Lý Thái Tổ (Lý Công Uẩn) ban Chiếu dời đô chuyển kinh đô từ Hoa Lư về Thăng Long.',
    difficulty: 'easy'
  },
  {
    id: 'geo_05',
    category: 'Lịch sử & Địa lý',
    question: 'Vịnh biển nào của Việt Nam 2 lần được UNESCO công nhận là Di sản thiên nhiên thế giới?',
    options: ['Vịnh Nha Trang', 'Vịnh Hạ Long', 'Vịnh Cam Ranh', 'Vịnh Lăng Cô'],
    correctIndex: 1,
    explanation: 'Vịnh Hạ Long (Quảng Ninh) được UNESCO vinh danh về giá trị thẩm mỹ và địa chất địa mạo.',
    difficulty: 'easy'
  },
  {
    id: 'geo_06',
    category: 'Lịch sử & Địa lý',
    question: 'Tỉnh/thành phố nào có diện tích lớn nhất Việt Nam hiện nay?',
    options: ['Nghệ An', 'Thanh Hóa', 'Gia Lai', 'Sơn La'],
    correctIndex: 0,
    explanation: 'Nghệ An là tỉnh có diện tích tự nhiên lớn nhất nước ta với khoảng 16.490 km².',
    difficulty: 'medium'
  },
  {
    id: 'geo_07',
    category: 'Lịch sử & Địa lý',
    question: 'Nữ tướng kiên cường nào có câu nói: "Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở biển Đông..."?',
    options: ['Hai Bà Trưng', 'Bà Triệu (Triệu Thị Trinh)', 'Nguyễn Thị Minh Khai', 'Võ Thị Sáu'],
    correctIndex: 1,
    explanation: 'Bà Triệu (226 - 248) lãnh đạo khởi nghĩa chống quân Ngô với câu nói khí phách ngút trời.',
    difficulty: 'easy'
  },
  {
    id: 'geo_08',
    category: 'Lịch sử & Địa lý',
    question: 'Đại dương nào có diện tích và độ sâu lớn nhất trên Trái Đất?',
    options: ['Đại Tây Dương', 'Ấn Độ Dương', 'Thái Bình Dương', 'Bắc Băng Dương'],
    correctIndex: 2,
    explanation: 'Thái Bình Dương chiếm khoảng 1/3 diện tích bề mặt Trái Đất và chứa rãnh Mariana sâu nhất.',
    difficulty: 'easy'
  },
  {
    id: 'geo_09',
    category: 'Lịch sử & Địa lý',
    question: 'Hang động tự nhiên lớn nhất thế giới nằm ở tỉnh nào của nước ta?',
    options: ['Ninh Bình', 'Quảng Bình', 'Cao Bằng', 'Hà Giang'],
    correctIndex: 1,
    explanation: 'Hang Sơn Đoòng nằm trong Vườn quốc gia Phong Nha - Kẻ Bàng, tỉnh Quảng Bình.',
    difficulty: 'easy'
  },
  {
    id: 'geo_10',
    category: 'Lịch sử & Địa lý',
    question: 'Vị tướng kiệt xuất nào lãnh đạo quân dân Đại Việt 3 lần đánh thắng giặc Nguyên Mông?',
    options: ['Trần Thủ Độ', 'Trần Hưng Đạo', 'Trần Quang Khải', 'Trần Khánh Dư'],
    correctIndex: 1,
    explanation: 'Hưng Đạo Đại Vương Trần Quốc Tuấn là vị chỉ huy tối cao 3 lần đại phá quân Mông Cổ.',
    difficulty: 'easy'
  },
  {
    id: 'geo_11',
    category: 'Lịch sử & Địa lý',
    question: 'Quốc gia nào có diện tích lãnh thổ lớn nhất trên thế giới?',
    options: ['Canada', 'Hoa Kỳ', 'Trung Quốc', 'Nga'],
    correctIndex: 3,
    explanation: 'Liên bang Nga có diện tích hơn 17 triệu km², trải dài qua cả châu Á và châu Âu.',
    difficulty: 'easy'
  },
  {
    id: 'geo_12',
    category: 'Lịch sử & Địa lý',
    question: 'Hồ nước ngọt tự nhiên lớn nhất Việt Nam nằm ở tỉnh Bắc Kạn là hồ nào?',
    options: ['Hồ Tây', 'Hồ Ba Bể', 'Hồ Núi Cốc', 'Hồ Tơ Nưng'],
    correctIndex: 1,
    explanation: 'Hồ Ba Bể là một trong 20 hồ nước ngọt tự nhiên lớn và đẹp nhất thế giới cần được bảo vệ.',
    difficulty: 'easy'
  },
  {
    id: 'geo_13',
    category: 'Lịch sử & Địa lý',
    question: 'Dòng sông nào dài nhất chảy hoàn toàn trong lãnh thổ Việt Nam?',
    options: ['Sông Hồng', 'Sông Đồng Nai', 'Sông Mã', 'Sông Cả'],
    correctIndex: 1,
    explanation: 'Sông Đồng Nai là con sông nội địa dài nhất Việt Nam với chiều dài khoảng 586 km.',
    difficulty: 'medium'
  },
  {
    id: 'geo_14',
    category: 'Lịch sử & Địa lý',
    question: 'Thành phố nào tại Việt Nam được biết đến với tên gọi "Thành phố Ngàn hoa"?',
    options: ['Đà Lạt', 'Sa Pa', 'Tam Đảo', 'Buôn Ma Thuột'],
    correctIndex: 0,
    explanation: 'Đà Lạt (Lâm Đồng) có khí hậu ôn đới quanh năm và bạt ngàn ngàn hoa rực rỡ.',
    difficulty: 'easy'
  },
  {
    id: 'geo_15',
    category: 'Lịch sử & Địa lý',
    question: 'Cực Đông trên đất liền của Việt Nam nằm tại tỉnh nào?',
    options: ['Bình Thuận', 'Khánh Hòa', 'Ninh Thuận', 'Phú Yên'],
    correctIndex: 1,
    explanation: 'Mũi Đôi tại bán đảo Hòn Gốm, Vạn Ninh, Khánh Hòa là điểm Cực Đông trên đất liền đón bình minh đầu tiên.',
    difficulty: 'medium'
  },
  {
    id: 'geo_16',
    category: 'Lịch sử & Địa lý',
    question: 'Kinh đô cổ xưa đầu tiên của nhà nước Văn Lang nằm ở đâu?',
    options: ['Cổ Loa', 'Phong Châu (Phú Thọ)', 'Hoa Lư', 'Thăng Long'],
    correctIndex: 1,
    explanation: 'Kinh đô Phong Châu (nay thuộc tỉnh Phú Thọ) là trung tâm của nhà nước Văn Lang thời các Vua Hùng.',
    difficulty: 'easy'
  },
  {
    id: 'geo_17',
    category: 'Lịch sử & Địa lý',
    question: 'Sa mạc cát lớn nhất thế giới là sa mạc nào?',
    options: ['Gobi', 'Kalahari', 'Sahara', 'Arabia'],
    correctIndex: 2,
    explanation: 'Sa mạc Sahara ở Bắc Phi có diện tích hơn 9 triệu km², là sa mạc nóng lớn nhất địa cầu.',
    difficulty: 'easy'
  },
  {
    id: 'geo_18',
    category: 'Lịch sử & Địa lý',
    question: 'Đảo nào có diện tích lớn nhất của đất nước Việt Nam?',
    options: ['Đảo Phú Quốc', 'Đảo Cát Bà', 'Đảo Côn Sơn', 'Đảo Lý Sơn'],
    correctIndex: 0,
    explanation: 'Đảo ngọc Phú Quốc (Kiên Giang) có diện tích khoảng 589 km², là đảo lớn nhất nước ta.',
    difficulty: 'easy'
  },
  {
    id: 'geo_19',
    category: 'Lịch sử & Địa lý',
    question: 'Ai là người cắm lá cờ chiến thắng lên nóc Dinh Độc Lập vào trưa ngày 30/4/1975?',
    options: ['Bùi Quang Thận', 'Võ Nguyên Giáp', 'Lê Duẩn', 'Nguyễn Hữu An'],
    correctIndex: 0,
    explanation: 'Đại đội trưởng Bùi Quang Thận là người trực tiếp cắm cờ giải phóng trên nóc Dinh Độc Lập.',
    difficulty: 'medium'
  },
  {
    id: 'geo_20',
    category: 'Lịch sử & Địa lý',
    question: 'Dãy núi nào được coi là ranh giới tự nhiên giữa châu Á và châu Âu?',
    options: ['Dãy Himalaya', 'Dãy Andes', 'Dãy Ural', 'Dãy Alps'],
    correctIndex: 2,
    explanation: 'Dãy núi Ural tại Nga phân chia ranh giới địa lý giữa hai châu lục Á và Âu.',
    difficulty: 'medium'
  },

  // --- KHOA HỌC & TỰ NHIÊN ---
  {
    id: 'sci_01',
    category: 'Khoa học & Tự nhiên',
    question: 'Hành tinh nào trong Hệ Mặt Trời được gọi là "Hành tinh Đỏ"?',
    options: ['Sao Kim', 'Sao Hỏa', 'Sao Mộc', 'Sao Thủy'],
    correctIndex: 1,
    explanation: 'Sao Hỏa có màu đỏ cam do bề mặt chứa nhiều oxit sắt (rỉ sét).',
    difficulty: 'easy'
  },
  {
    id: 'sci_02',
    category: 'Khoa học & Tự nhiên',
    question: 'Khí nào chiếm tỷ lệ phần trăm lớn nhất trong bầu khí quyển Trái Đất?',
    options: ['Khí Oxy (O2)', 'Khí Nitơ (N2)', 'Khí Cacbonic (CO2)', 'Khí Argon (Ar)'],
    correctIndex: 1,
    explanation: 'Khí Nitơ chiếm khoảng 78% thể tích khí quyển, trong khi Oxy chiếm khoảng 21%.',
    difficulty: 'medium'
  },
  {
    id: 'sci_03',
    category: 'Khoa học & Tự nhiên',
    question: 'Loài động vật có vú nào là loài lớn nhất từng tồn tại trên Trái Đất?',
    options: ['Voi châu Phi', 'Cá voi xanh', 'Cá mập Megalodon', 'Khủng long bạo chúa'],
    correctIndex: 1,
    explanation: 'Cá voi xanh có thể dài hơn 30 mét và nặng tới 180-200 tấn.',
    difficulty: 'easy'
  },
  {
    id: 'sci_04',
    category: 'Khoa học & Tự nhiên',
    question: 'Công thức hóa học của nước tinh khiết là gì?',
    options: ['H2O', 'CO2', 'NaCl', 'H2SO4'],
    correctIndex: 0,
    explanation: 'Mỗi phân tử nước gồm 2 nguyên tử Hiđrô liên kết với 1 nguyên tử Oxy (H2O).',
    difficulty: 'easy'
  },
  {
    id: 'sci_05',
    category: 'Khoa học & Tự nhiên',
    question: 'Cơ quan nào trong cơ thể con người chịu trách nhiệm bơm máu đi nuôi các mô?',
    options: ['Phổi', 'Gan', 'Tim', 'Thận'],
    correctIndex: 2,
    explanation: 'Trái tim đập liên tục khoảng 100.000 lần mỗi ngày để bơm máu đi khắp cơ thể.',
    difficulty: 'easy'
  },
  {
    id: 'sci_06',
    category: 'Khoa học & Tự nhiên',
    question: 'Ánh sáng di chuyển với vận tốc xấp xỉ bao nhiêu trong chân không?',
    options: ['300.000 km/h', '300.000 km/s', '1.500 km/s', '30.000 km/s'],
    correctIndex: 1,
    explanation: 'Vận tốc ánh sáng trong chân không là khoảng 299.792 km/giây (~300.000 km/s).',
    difficulty: 'medium'
  },
  {
    id: 'sci_07',
    category: 'Khoa học & Tự nhiên',
    question: 'Loài chim nào có khả năng bay lùi về phía sau duy nhất trên thế giới?',
    options: ['Chim bồ câu', 'Chim ruồi', 'Chim ưng', 'Chim én'],
    correctIndex: 1,
    explanation: 'Chim ruồi có cấu tạo khớp cánh linh hoạt đặc biệt giúp chúng bay đứng yên, bay tiến và cả bay lùi.',
    difficulty: 'medium'
  },
  {
    id: 'sci_08',
    category: 'Khoa học & Tự nhiên',
    question: 'Quá trình thực vật sử dụng ánh sáng mặt trời để tổng hợp chất dinh dưỡng gọi là gì?',
    options: ['Hô hấp', 'Thoát hơi nước', 'Quang hợp', 'Lên men'],
    correctIndex: 2,
    explanation: 'Quang hợp nhờ sắc tố diệp lục giúp cây biến đổi CO2 và nước thành Glucose và khí O2.',
    difficulty: 'easy'
  },
  {
    id: 'sci_09',
    category: 'Khoa học & Tự nhiên',
    question: 'Mặt Trời của chúng ta thuộc loại thiên thể nào trong vũ trụ?',
    options: ['Hành tinh', 'Một ngôi sao', 'Vệ tinh tự nhiên', 'Sao chổi'],
    correctIndex: 1,
    explanation: 'Mặt Trời là một ngôi sao dạng lùn vàng nằm ở trung tâm của Hệ Mặt Trời.',
    difficulty: 'easy'
  },
  {
    id: 'sci_10',
    category: 'Khoa học & Tự nhiên',
    question: 'Kim cương và than chì đều được cấu tạo từ nguyên tố hóa học nào?',
    options: ['Sắt', 'Cacbon', 'Silic', 'Oxy'],
    correctIndex: 1,
    explanation: 'Kim cương và than chì là các dạng thù hình của nguyên tố Cacbon (C).',
    difficulty: 'easy'
  },
  {
    id: 'sci_11',
    category: 'Khoa học & Tự nhiên',
    question: 'Bộ phận nào của cây làm nhiệm vụ hút nước và chất khoáng hòa tan từ đất?',
    options: ['Lá cây', 'Thân cây', 'Rễ cây', 'Hoa'],
    correctIndex: 2,
    explanation: 'Rễ cây có các lông hút đặc biệt làm nhiệm vụ hấp thụ nước và khoáng chất nuôi cây.',
    difficulty: 'easy'
  },
  {
    id: 'sci_12',
    category: 'Khoa học & Tự nhiên',
    question: 'Kim loại nào tồn tại ở thể lỏng ở điều kiện nhiệt độ phòng bình thường?',
    options: ['Đồng', 'Sắt', 'Thủy ngân', 'Nhôm'],
    correctIndex: 2,
    explanation: 'Thủy ngân (Hg) có điểm nóng chảy là -38.8°C nên ở thể lỏng trong nhiệt độ phòng.',
    difficulty: 'easy'
  },
  {
    id: 'sci_13',
    category: 'Khoa học & Tự nhiên',
    question: 'Cá heo và cá voi hô hấp bằng cơ quan nào?',
    options: ['Mang', 'Phổi', 'Da', 'Bong bóng cá'],
    correctIndex: 1,
    explanation: 'Cá heo và cá voi là động vật có vú, thở bằng phổi nên phải ngoi lên mặt nước để lấy oxy.',
    difficulty: 'easy'
  },
  {
    id: 'sci_14',
    category: 'Khoa học & Tự nhiên',
    question: 'Khủng long bị tuyệt chủng cách đây khoảng bao nhiêu triệu năm?',
    options: ['Khoảng 10 triệu năm', 'Khoảng 66 triệu năm', 'Khoảng 200 triệu năm', 'Khoảng 1 tỷ năm'],
    correctIndex: 1,
    explanation: 'Sự kiện tuyệt chủng kỷ Creta xảy ra khoảng 66 triệu năm trước sau vụ va chạm tiểu hành tinh khổng lồ.',
    difficulty: 'medium'
  },
  {
    id: 'sci_15',
    category: 'Khoa học & Tự nhiên',
    question: 'Hiện tượng cầu vồng xuất hiện sau cơn mưa là do hiện tượng quang học nào?',
    options: ['Nhiễu xạ ánh sáng', 'Tán sắc ánh sáng qua giọt nước', 'Hấp thụ ánh sáng', 'Giao thoa ánh sáng'],
    correctIndex: 1,
    explanation: 'Các giọt nước mưa đóng vai trò như lăng kính nhỏ, tán sắc ánh sáng mặt trời thành 7 sắc cầu vồng.',
    difficulty: 'medium'
  },

  // --- ĐỐ VUI & DÂN GIAN ---
  {
    id: 'fun_01',
    category: 'Đố vui & Dân gian',
    question: 'Cái gì bạn có thể cầm được bằng tay phải nhưng không bao giờ cầm được bằng tay trái?',
    options: ['Cái bút', 'Cùi chỏ tay trái', 'Cùi chỏ tay phải', 'Điện thoại'],
    correctIndex: 2,
    explanation: 'Bàn tay trái không thể nào tự cầm vào cùi chỏ (khuỷu tay) của chính nó!',
    difficulty: 'easy'
  },
  {
    id: 'fun_02',
    category: 'Đố vui & Dân gian',
    question: 'Càng kéo thì càng ngắn là cái gì?',
    options: ['Sợi dây thừng', 'Điếu thuốc lá', 'Con đường đi', 'Sợi chỉ'],
    correctIndex: 1,
    explanation: 'Khi hút (kéo một hơi) thuốc lá thì điếu thuốc sẽ cháy tàn và ngắn lại dần.',
    difficulty: 'easy'
  },
  {
    id: 'fun_03',
    category: 'Đố vui & Dân gian',
    question: 'Tháng nào trong năm người ta ngủ ít nhất?',
    options: ['Tháng 1', 'Tháng 2', 'Tháng 7', 'Tháng 12'],
    correctIndex: 1,
    explanation: 'Tháng 2 chỉ có 28 hoặc 29 ngày, ít ngày nhất trong năm nên người ta ngủ ít nhất.',
    difficulty: 'easy'
  },
  {
    id: 'fun_04',
    category: 'Đố vui & Dân gian',
    question: 'Con gì đập thì sống, không đập thì chết?',
    options: ['Con cá', 'Con muỗi', 'Con tim', 'Con rắn'],
    correctIndex: 2,
    explanation: 'Trái tim phải đập liên tục để duy trì sự sống của con người và động vật.',
    difficulty: 'easy'
  },
  {
    id: 'fun_05',
    category: 'Đố vui & Dân gian',
    question: 'Cái gì đen khi bạn mua nó, đỏ khi bạn dùng nó, và xám khi bạn vứt nó đi?',
    options: ['Hòn đá', 'Hòn than củi', 'Thỏi son', 'Cục tẩy'],
    correctIndex: 1,
    explanation: 'Than củi màu đen, khi đốt đỏ rực, và khi cháy hết thành tro tàn màu xám.',
    difficulty: 'easy'
  },
  {
    id: 'fun_06',
    category: 'Đố vui & Dân gian',
    question: 'Có một đàn vịt: 1 con đi trước 2 con, 1 con đi sau 2 con, 1 con đi giữa 2 con. Hỏi có mấy con vịt?',
    options: ['3 con vịt', '4 con vịt', '5 con vịt', '6 con vịt'],
    correctIndex: 0,
    explanation: 'Chỉ có 3 con vịt đi theo hàng dọc: con thứ nhất trước 2 con, con thứ ba sau 2 con, con thứ hai ở giữa.',
    difficulty: 'easy'
  },
  {
    id: 'fun_07',
    category: 'Đố vui & Dân gian',
    question: 'Vua gọi hoàng hậu bằng gì?',
    options: ['Bằng nàng', 'Bằng miệng', 'Bằng ái khanh', 'Bằng tên'],
    correctIndex: 1,
    explanation: 'Đố mẹo: Vua gọi hoàng hậu bằng... miệng chứ bằng gì nữa!',
    difficulty: 'easy'
  },
  {
    id: 'fun_08',
    category: 'Đố vui & Dân gian',
    question: 'Bánh gì đi vòng tròn mà không bao giờ ăn được?',
    options: ['Bánh chưng', 'Bánh xe', 'Bánh mì', 'Bánh bao'],
    correctIndex: 1,
    explanation: 'Bánh xe quay tròn liên tục để xe chạy chứ không ăn được.',
    difficulty: 'easy'
  },
  {
    id: 'fun_09',
    category: 'Đố vui & Dân gian',
    question: 'Cái gì đi lên mà không bao giờ đi xuống?',
    options: ['Tuổi tác', 'Cầu thang', 'Khinh khí cầu', 'Cơn mưa'],
    correctIndex: 0,
    explanation: 'Tuổi của con người mỗi năm chỉ có tăng lên chứ không bao giờ giảm xuống.',
    difficulty: 'easy'
  },
  {
    id: 'fun_10',
    category: 'Đố vui & Dân gian',
    question: 'Loài hoa nào tượng trưng cho tinh thần bất khuất và thanh cao, "gần bùn mà chẳng hôi tanh mùi bùn"?',
    options: ['Hoa Hồng', 'Hoa Sen', 'Hoa Mai', 'Hoa Lan'],
    correctIndex: 1,
    explanation: 'Hoa Sen là biểu tượng thanh khiết và quốc hoa truyền thống trong tâm thức người Việt.',
    difficulty: 'easy'
  },

  // --- TOÁN HỌC & LOGIC ---
  {
    id: 'math_01',
    category: 'Toán học & Logic',
    question: 'Số nguyên tố chẵn duy nhất trong tập hợp các số tự nhiên là số nào?',
    options: ['Số 0', 'Số 2', 'Số 4', 'Số 6'],
    correctIndex: 1,
    explanation: 'Số 2 là số nguyên tố chẵn duy nhất, tất cả các số chẵn khác lớn hơn 2 đều chia hết cho 2.',
    difficulty: 'easy'
  },
  {
    id: 'math_02',
    category: 'Toán học & Logic',
    question: 'Tổng ba góc trong của một tam giác luôn bằng bao nhiêu độ?',
    options: ['90 độ', '180 độ', '270 độ', '360 độ'],
    correctIndex: 1,
    explanation: 'Định lý hình học phẳng: Tổng ba góc trong của một tam giác luôn bằng 180°.',
    difficulty: 'easy'
  },
  {
    id: 'math_03',
    category: 'Toán học & Logic',
    question: 'Một hình lập phương có tất cả bao nhiêu mặt phẳng?',
    options: ['4 mặt', '6 mặt', '8 mặt', '12 mặt'],
    correctIndex: 1,
    explanation: 'Hình lập phương có 6 mặt vuông bằng nhau, 8 đỉnh và 12 cạnh.',
    difficulty: 'easy'
  },
  {
    id: 'math_04',
    category: 'Toán học & Logic',
    question: 'Số La Mã "XIV" tương ứng với số tự nhiên nào trong hệ thập phân?',
    options: ['11', '14', '16', '24'],
    correctIndex: 1,
    explanation: 'X là 10, IV là 4, nên XIV là 10 + 4 = 14.',
    difficulty: 'easy'
  },
  {
    id: 'math_05',
    category: 'Toán học & Logic',
    question: 'Tính nhanh phép tính: 25 x 4 + 75 x 4 = ?',
    options: ['300', '400', '500', '600'],
    correctIndex: 1,
    explanation: '(25 + 75) x 4 = 100 x 4 = 400.',
    difficulty: 'easy'
  },
  {
    id: 'math_06',
    category: 'Toán học & Logic',
    question: 'Số tiếp theo trong dãy số: 2, 4, 8, 16, 32, ... là số nào?',
    options: ['48', '60', '64', '72'],
    correctIndex: 2,
    explanation: 'Quy luật mỗi số gấp đôi số liền trước: 32 x 2 = 64.',
    difficulty: 'easy'
  },
  {
    id: 'math_07',
    category: 'Toán học & Logic',
    question: 'Số nhỏ nhất có ba chữ số khác nhau là số nào?',
    options: ['100', '101', '102', '123'],
    correctIndex: 2,
    explanation: 'Số nhỏ nhất có 3 chữ số khác nhau là 102 (chữ số hàng trăm là 1, chục là 0, đơn vị là 2).',
    difficulty: 'medium'
  },
  {
    id: 'math_08',
    category: 'Toán học & Logic',
    question: 'Nếu 5 người thợ xây một bức tường mất 5 ngày, thì 1 người thợ xây bức tường đó mất bao nhiêu ngày (cùng năng suất)?',
    options: ['1 ngày', '5 ngày', '25 ngày', '10 ngày'],
    correctIndex: 2,
    explanation: 'Tổng công là 5 x 5 = 25 ngày công. Một người làm sẽ mất 25 ngày.',
    difficulty: 'medium'
  },
  {
    id: 'math_09',
    category: 'Toán học & Logic',
    question: 'Hình tròn có đường kính 10cm thì bán kính bằng bao nhiêu?',
    options: ['2.5 cm', '5 cm', '10 cm', '20 cm'],
    correctIndex: 1,
    explanation: 'Bán kính hình tròn bằng một nửa đường kính: R = D / 2 = 10 / 2 = 5cm.',
    difficulty: 'easy'
  },
  {
    id: 'math_10',
    category: 'Toán học & Logic',
    question: 'Dãy Fibonacci bắt đầu: 1, 1, 2, 3, 5, 8, 13... Số tiếp theo là số nào?',
    options: ['18', '20', '21', '24'],
    correctIndex: 2,
    explanation: 'Mỗi số bằng tổng 2 số liền trước: 8 + 13 = 21.',
    difficulty: 'medium'
  },

  // --- VĂN HÓA & ĐỜI SỐNG ---
  {
    id: 'cul_01',
    category: 'Văn hóa & Đời sống',
    question: 'Món ăn truyền thống không thể thiếu trong ngày Tết Nguyên Đán của người Việt miền Bắc là gì?',
    options: ['Bánh chưng', 'Bánh tét', 'Bánh xèo', 'Bánh pía'],
    correctIndex: 0,
    explanation: 'Bánh chưng vuông vắn tượng trưng cho Đất, gắn liền với truyền thuyết Lang Liêu thời Hùng Vương.',
    difficulty: 'easy'
  },
  {
    id: 'cul_02',
    category: 'Văn hóa & Đời sống',
    question: 'Đại thi hào nào là tác giả của tác phẩm kinh điển "Truyện Kiều" (Đoạn trường tân thanh)?',
    options: ['Nguyễn Trãi', 'Nguyễn Du', 'Hồ Xuân Hương', 'Cao Bá Quát'],
    correctIndex: 1,
    explanation: 'Nguyễn Du (1765 - 1820) được UNESCO vinh danh là Danh nhân văn hóa thế giới với kiệt tác Truyện Kiều.',
    difficulty: 'easy'
  },
  {
    id: 'cul_03',
    category: 'Văn hóa & Đời sống',
    question: 'Ngày Giỗ Tổ Hùng Vương được tổ chức vào ngày âm lịch nào hàng năm?',
    options: ['Mùng 1 tháng Giêng', 'Mùng 3 tháng 3', 'Mùng 10 tháng 3', 'Rằm tháng 8'],
    correctIndex: 2,
    explanation: 'Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng mười tháng ba.',
    difficulty: 'easy'
  },
  {
    id: 'cul_04',
    category: 'Văn hóa & Đời sống',
    question: 'Nghi lễ và trò chơi kéo co truyền thống ở Việt Nam đã được UNESCO công nhận là gì năm 2015?',
    options: ['Di sản văn hóa phi vật thể đại diện của nhân loại', 'Kỳ quan văn hóa', 'Di sản tư liệu thế giới', 'Khu dự trữ sinh quyển'],
    correctIndex: 0,
    explanation: 'Nghi thức kéo co tại Việt Nam, Campuchia, Hàn Quốc và Philippines được UNESCO công nhận năm 2015.',
    difficulty: 'easy'
  },
  {
    id: 'cul_05',
    category: 'Văn hóa & Đời sống',
    question: 'Họa sĩ thiên tài Leonardo da Vinci là tác giả của bức tranh bí ẩn nổi tiếng nào?',
    options: ['Đêm đầy sao', 'Mona Lisa (Nàng La Gioconda)', 'Tiếng thét', 'Bữa tiệc ly'],
    correctIndex: 1,
    explanation: 'Bức chân dung Mona Lisa với nụ cười bí ẩn hiện được trưng bày tại bảo tàng Louvre, Paris.',
    difficulty: 'easy'
  },
  {
    id: 'cul_06',
    category: 'Văn hóa & Đời sống',
    question: 'Loại nhạc cụ truyền thống của Việt Nam chỉ có duy nhất một dây nhưng phát ra âm thanh kỳ diệu là đàn gì?',
    options: ['Đàn Bầu (Độc huyền cầm)', 'Đàn Tranh', 'Đàn Nguyệt', 'Đàn Nhị'],
    correctIndex: 0,
    explanation: 'Đàn Bầu là nhạc cụ độc đáo chỉ có một dây dùng cần uốn để tạo nên nhiều cung bậc âm thanh truyền cảm.',
    difficulty: 'easy'
  },
  {
    id: 'cul_07',
    category: 'Văn hóa & Đời sống',
    question: 'Kỳ Thế vận hội Olympic mùa hè hiện đại được tổ chức định kỳ mấy năm một lần?',
    options: ['2 năm', '3 năm', '4 năm', '5 năm'],
    correctIndex: 2,
    explanation: 'Thế vận hội Olympic mùa hè được tổ chức định kỳ 4 năm một lần quy tụ các vận động viên toàn cầu.',
    difficulty: 'easy'
  },
  {
    id: 'cul_08',
    category: 'Văn hóa & Đời sống',
    question: 'Văn Miếu - Quốc Tử Giám tại Hà Nội được coi là gì của Việt Nam?',
    options: ['Trường đại học đầu tiên', 'Bảo tàng lớn nhất', 'Nhà hát cổ nhất', 'Thư viện đầu tiên'],
    correctIndex: 0,
    explanation: 'Quốc Tử Giám được thành lập năm 1076 dưới thời vua Lý Nhân Tông, được xem là trường đại học đầu tiên.',
    difficulty: 'easy'
  },
  {
    id: 'cul_09',
    category: 'Văn hóa & Đời sống',
    question: 'Trang phục truyền thống nổi tiếng tôn vinh nét đẹp của người phụ nữ Việt Nam là gì?',
    options: ['Áo dài', 'Áo bà ba', 'Áo tứ thân', 'Váy yếm'],
    correctIndex: 0,
    explanation: 'Áo dài là quốc phục truyền thống thanh lịch mang đậm bản sắc văn hóa Việt Nam.',
    difficulty: 'easy'
  },
  {
    id: 'cul_10',
    category: 'Văn hóa & Đời sống',
    question: 'Bộ môn nghệ thuật sân khấu dân gian độc đáo của vùng đồng bằng Bắc Bộ biểu diễn trên mặt nước là gì?',
    options: ['Múa rối nước', 'Hát Chèo', 'Hát Tuồng', 'Ca trù'],
    correctIndex: 0,
    explanation: 'Múa rối nước là nét văn hóa dân gian độc nhất vô nhị diễn ra trên thủy đình của các làng quê.',
    difficulty: 'easy'
  },
  {
    id: 'geo_21',
    category: 'Lịch sử & Địa lý',
    question: 'Chiếc cầu treo dây văng đầu tiên bắc qua sông Tiền được khánh thành năm 2000 là cầu nào?',
    options: ['Cầu Cần Thơ', 'Cầu Mỹ Thuận', 'Cầu Rạch Miễu', 'Cầu Vàm Cống'],
    correctIndex: 1,
    explanation: 'Cầu Mỹ Thuận nối liền hai tỉnh Tiền Giang và Vĩnh Long là cây cầu dây văng đầu tiên ở đồng bằng sông Cửu Long.',
    difficulty: 'easy'
  },
  {
    id: 'sci_16',
    category: 'Khoa học & Tự nhiên',
    question: 'Mặt Trăng quay quanh thiên thể nào?',
    options: ['Mặt Trời', 'Trái Đất', 'Sao Hỏa', 'Sao Mộc'],
    correctIndex: 1,
    explanation: 'Mặt Trăng là vệ tinh tự nhiên duy nhất của Trái Đất và quay quanh Trái Đất theo quỹ đạo elip.',
    difficulty: 'easy'
  },
  {
    id: 'sci_17',
    category: 'Khoa học & Tự nhiên',
    question: 'Côn trùng có bao nhiêu cái chân?',
    options: ['4 chân', '6 chân', '8 chân', '10 chân'],
    correctIndex: 1,
    explanation: 'Đặc điểm chung của lớp côn trùng là cơ thể chia làm 3 phần và luôn có 6 chân (3 cặp chân).',
    difficulty: 'easy'
  },
  {
    id: 'math_11',
    category: 'Toán học & Logic',
    question: 'Một tam giác đều có ba góc đều bằng bao nhiêu độ?',
    options: ['45 độ', '60 độ', '90 độ', '120 độ'],
    correctIndex: 1,
    explanation: 'Tam giác đều có 3 cạnh bằng nhau và 3 góc bằng nhau: 180 / 3 = 60 độ.',
    difficulty: 'easy'
  },
  {
    id: 'fun_11',
    category: 'Đố vui & Dân gian',
    question: 'Con gì có mũi mà không có mắt, có lưỡi mà không có miệng?',
    options: ['Con thuyền', 'Con dao', 'Cây kéo', 'Cái quạt'],
    correctIndex: 1,
    explanation: 'Con dao có mũi dao và lưỡi dao sắc bén nhưng không có mắt hay miệng.',
    difficulty: 'easy'
  }
];

// Dynamic Question Generator to create infinite fresh math & logic questions on the fly
export function generateDynamicQuestion(idPrefix: string): Question {
  const types = ['math_add_mult', 'math_series', 'quick_calc', 'time_logic'];
  const chosenType = types[Math.floor(Math.random() * types.length)];

  if (chosenType === 'math_add_mult') {
    const a = Math.floor(Math.random() * 8) + 3; // 3 - 10
    const b = Math.floor(Math.random() * 8) + 2; // 2 - 9
    const c = Math.floor(Math.random() * 20) + 10;
    const answer = a * b + c;

    const wrong1 = answer + Math.floor(Math.random() * 5) + 1;
    const wrong2 = Math.max(1, answer - (Math.floor(Math.random() * 4) + 1));
    const wrong3 = answer + 10;

    const rawOptions = [answer, wrong1, wrong2, wrong3];
    const shuffled = rawOptions.sort(() => Math.random() - 0.5);
    const correctIdx = shuffled.indexOf(answer);

    return {
      id: `${idPrefix}_dyn_math_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      category: 'Toán học & Logic',
      question: `Tính nhanh kết quả của phép tính: ${a} x ${b} + ${c} = ?`,
      options: shuffled.map(String) as [string, string, string, string],
      correctIndex: correctIdx,
      explanation: `Thực hiện nhân trước cộng sau: ${a} x ${b} = ${a * b}, sau đó cộng ${c} được ${answer}.`,
      difficulty: 'easy'
    };
  } else if (chosenType === 'math_series') {
    const step = Math.floor(Math.random() * 5) + 3; // 3 - 7
    const start = Math.floor(Math.random() * 10) + 2;
    const s1 = start;
    const s2 = s1 + step;
    const s3 = s2 + step;
    const s4 = s3 + step;
    const s5 = s4 + step; // correct

    const wrong1 = s5 + step;
    const wrong2 = s5 - 1;
    const wrong3 = s5 + 2;

    const rawOptions = [s5, wrong1, wrong2, wrong3];
    const shuffled = rawOptions.sort(() => Math.random() - 0.5);
    const correctIdx = shuffled.indexOf(s5);

    return {
      id: `${idPrefix}_dyn_series_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      category: 'Toán học & Logic',
      question: `Tìm số tiếp theo trong dãy số: ${s1}, ${s2}, ${s3}, ${s4}, ... ?`,
      options: shuffled.map(String) as [string, string, string, string],
      correctIndex: correctIdx,
      explanation: `Quy luật của dãy số là cộng thêm ${step} vào số liền trước: ${s4} + ${step} = ${s5}.`,
      difficulty: 'easy'
    };
  } else {
    const hours = Math.floor(Math.random() * 5) + 2; // 2 to 6 hours
    const minutes = hours * 60;

    const wrong1 = minutes - 30;
    const wrong2 = minutes + 45;
    const wrong3 = hours * 100;

    const rawOptions = [`${minutes} phút`, `${wrong1} phút`, `${wrong2} phút`, `${wrong3} phút`];
    const answerStr = `${minutes} phút`;
    const shuffled = rawOptions.sort(() => Math.random() - 0.5);
    const correctIdx = shuffled.indexOf(answerStr);

    return {
      id: `${idPrefix}_dyn_time_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      category: 'Khoa học & Tự nhiên',
      question: `${hours} giờ tương đương với bao nhiêu phút?`,
      options: shuffled as [string, string, string, string],
      correctIndex: correctIdx,
      explanation: `Vì mỗi 1 giờ có 60 phút, nên ${hours} giờ = ${hours} x 60 = ${minutes} phút.`,
      difficulty: 'easy'
    };
  }
}

// Fisher-Yates helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Randomize options for a question so correct answer is at a random position each match
export function randomizeQuestionOptions(q: Question): Question {
  const originalCorrectAnswer = q.options[q.correctIndex];
  const shuffledOptions = shuffleArray(q.options) as [string, string, string, string];
  const newCorrectIndex = shuffledOptions.indexOf(originalCorrectAnswer);

  return {
    ...q,
    options: shuffledOptions,
    correctIndex: newCorrectIndex,
  };
}

const STORAGE_KEY_USED_QUESTIONS = 'keoco_used_questions_v1';

function getUsedQuestionIds(): string[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY_USED_QUESTIONS);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [];
}

function saveUsedQuestionIds(ids: string[]): void {
  try {
    sessionStorage.setItem(STORAGE_KEY_USED_QUESTIONS, JSON.stringify(ids.slice(-100)));
  } catch {
    // ignore
  }
}

/**
 * High-performance smart selector guaranteeing fresh, non-repeating questions continuously!
 * Each match draws 20 fresh questions (10 for Red Team, 10 for Blue Team).
 */
export function getFreshMatchQuestions(selectedCategories: string[] = ['Tất cả']): {
  redQuestions: Question[];
  blueQuestions: Question[];
  allQuestions: Question[];
} {
  let pool = [...INITIAL_QUESTIONS];

  // Filter category if specified and not 'Tất cả'
  if (selectedCategories && selectedCategories.length > 0 && !selectedCategories.includes('Tất cả')) {
    const filtered = pool.filter((q) => selectedCategories.includes(q.category));
    if (filtered.length >= 10) {
      pool = filtered;
    }
  }

  // Check used question IDs from recent matches to ensure continuous freshness
  const usedIds = getUsedQuestionIds();
  let unusedPool = pool.filter((q) => !usedIds.includes(q.id));

  // If we have fewer than 20 unused questions left, reset history so it cycles smoothly
  if (unusedPool.length < 20) {
    unusedPool = pool;
    saveUsedQuestionIds([]);
  }

  // Shuffle the unused pool
  const shuffled = shuffleArray(unusedPool);

  // Take 20 questions
  const selected: Question[] = [];
  const newlyUsedIds: string[] = [...usedIds];

  for (let i = 0; i < 20; i++) {
    if (i < shuffled.length) {
      const q = randomizeQuestionOptions(shuffled[i]);
      selected.push(q);
      newlyUsedIds.push(q.id);
    } else {
      // If pool didn't have enough, dynamically generate procedural questions!
      const dynQ = generateDynamicQuestion(`match_round_${i}`);
      selected.push(dynQ);
    }
  }

  // Update used IDs in sessionStorage
  saveUsedQuestionIds(newlyUsedIds);

  // Split into 10 questions for Red Team, 10 questions for Blue Team
  const redQuestions = selected.slice(0, 10);
  const blueQuestions = selected.slice(10, 20);

  return {
    redQuestions,
    blueQuestions,
    allQuestions: selected,
  };
}
