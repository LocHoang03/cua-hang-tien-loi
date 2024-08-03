using Accord.MachineLearning;
using Accord.Math.Random;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DAL
{
    public class PhanCumKH_Kmean
    {
        public PhanCumKH_Kmean() { }



        public static Dictionary<string, int> PhanCum(double[][] customerData)
        {


            double[][] initialCentroids = new double[][]
        {
            new double[] { 4, 2500000 },
            new double[] { 4, 1200000 },
            new double[] { 1, 2500000 },
            new double[] { 1, 1200000 }
        };

            // Tạo đối tượng KMeans
            var kmeans = new KMeans(4);

            // Học dữ liệu với các centroid đã cho
            var kmeansMachine = kmeans.Learn(initialCentroids);

            // Lấy các centroid đã học
            double[][] learnedCentroids = kmeansMachine.Centroids;

            // Sắp xếp các centroid theo ý muốn
            var sortedCentroids = initialCentroids
                .OrderByDescending(c => c[0])  // Sắp xếp giảm dần theo cột đầu tiên
                .ThenByDescending(c => c[1])  // Nếu cột đầu tiên bằng nhau, sắp xếp giảm dần theo cột thứ hai
                .ToArray();

            // Tạo mô hình KMeans mới với các centroid đã sắp xếp
            var kmeansWithCustomCentroids = new KMeans(4)
            {
                Centroids = sortedCentroids
            };

            // Học dữ liệu với các centroid đã sắp xếp
            var kmeansMachineWithCustomCentroids = kmeansWithCustomCentroids.Learn(initialCentroids);

            // Dự đoán nhãn cho dữ liệu khách hàng với mô hình KMeans tùy chỉnh
            int[] labels = kmeansMachineWithCustomCentroids.Decide(customerData);
            //for (int i = 0; i < labels.Length; i++)
            //{
            //    int clusterIndex = labels[i];
            //    double[] data = customerData[i];

            //    Console.WriteLine(String.Format("Khách hàng {0} thuộc cụm {1}", i, clusterIndex));
            //    Console.WriteLine(String.Format("- Số lần mua hàng: {0}", data[0]));
            //    Console.WriteLine(String.Format("- Tổng chi tiêu: {0}", data[1]));
            //    Console.WriteLine();
            //}
            Console.WriteLine("==============================================");
            AnalyzeClusters(customerData, labels, kmeans.Centroids);
            var labelCounts = labels
                .GroupBy(label => label)
                .ToDictionary(
                    group => GetGroupName(group.Key),
                    group => group.Count()
                );

            return labelCounts;
        }

        public static string[] GetGroupNames()
        {
            return new[]
            {
                "Nhóm khách hàng ít mua hàng, tổng giá trị cao (1 tháng)",
                "Nhóm khách hàng thường xuyên, tổng giá trị cao (1 tháng)",
                "Nhóm khách hàng ít mua hàng, tổng giá trị thấp (1 tháng)",
                "Nhóm khách hàng thường xuyên, tổng giá trị thấp (1 tháng)"
            };
        }

        private static string GetGroupName(int clusterIndex)
        {
            switch (clusterIndex)
            {

                case 0:
                    return "Nhóm khách hàng thường xuyên, tổng giá trị cao (1 tháng)";
                case 1:
                    return "Nhóm khách hàng thường xuyên, tổng giá trị thấp (1 tháng)";
                case 2:
                    return "Nhóm khách hàng ít mua hàng, tổng giá trị cao (1 tháng)";
                case 3:
                    return "Nhóm khách hàng ít mua hàng, tổng giá trị thấp (1 tháng)";

                default:
                    return "Nhóm không xác định";
            }
        }



        private static void AnalyzeClusters(double[][] customerData, int[] labels, double[][] centroids)
        {
            int k = centroids.Length;

            // Tính toán các đặc điểm trung bình của từng cụm
            for (int i = 0; i < k; i++)
            {
                var clusterData = customerData
                    .Where((data, index) => labels[index] == i)
                    .ToArray();

                if (clusterData.Length > 0)
                {
                    double avgPurchaseCount = clusterData.Average(data => data[0]);
                    double avgTotalFee = clusterData.Average(data => data[1]);

                    Console.WriteLine("Cum" + i + ":");
                    Console.WriteLine("- Trung binh so lan mua hang:" + avgPurchaseCount);
                    Console.WriteLine("- Trung binh tong chi tieu: " + avgTotalFee);
                    Console.WriteLine();
                }
            }
        }

    }
}
