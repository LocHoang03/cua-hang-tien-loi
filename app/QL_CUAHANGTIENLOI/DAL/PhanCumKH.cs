using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class PhanCumKH
    {
        public PhanCumKH() { }

        public static Dictionary<string, int> ClassifyUsers(List<DTO.ORDER> orders)
        {
            var result = new Dictionary<string, int>
            {
                { "Nhóm khách mua hàng thường xuyên, tổng giá trị cao(1 tháng)", 0 },
                { "Nhóm khách hàng ít mua hàng, tổng giá trị thấp(1 tháng)", 0 },
                { "Nhóm khách hàng mua hàng thường xuyên, tổng giá trị thấp(1 tháng)", 0 },
                { "Nhóm khách hàng ít mua hàng, tổng giá trị cao(1 tháng)", 0 }
            };

            var groupedOrders = orders
                .GroupBy(o => o.USER_ID)
                .Select(g => new
                {
                    UserId = g.Key,
                    PurchaseCount = g.Count(),
                    TotalFee = (double)g.Sum(o => o.FEE) // Chuyển đổi decimal thành double
                })
                .ToList();

            // Chuẩn bị dữ liệu cho K-Means
            double[][] observations = groupedOrders
                .Select(u => new double[] { u.PurchaseCount, u.TotalFee })
                .ToArray();

            // Áp dụng thuật toán K-Means
            int k = 4; // số cụm
            int maxIterations = 100; // số lần lặp tối đa
            double[][] centroids = InitializeCentroids(observations, k);
            int[] labels = new int[observations.Length];
            bool centroidsChanged;

            for (int iteration = 0; iteration < maxIterations; iteration++)
            {
                centroidsChanged = false;

                // Gán nhãn cho mỗi điểm dữ liệu
                for (int i = 0; i < observations.Length; i++)
                {
                    int closestCentroid = ClosestCentroid(observations[i], centroids);
                    if (labels[i] != closestCentroid)
                    {
                        labels[i] = closestCentroid;
                        centroidsChanged = true;
                    }
                }

                if (!centroidsChanged)
                    break;

                // Cập nhật các tâm cụm
                UpdateCentroids(observations, labels, k, centroids);
            }

            // Gán tên nhóm dựa trên các tâm cụm và số lần mua, tổng chi phí
            for (int i = 0; i < labels.Length; i++)
            {
                var user = groupedOrders[i];
                string groupName = GetGroupName(user.PurchaseCount, user.TotalFee, centroids[labels[i]]);
                result[groupName]++;
            }

            return result;
        }

        private static double[][] InitializeCentroids(double[][] observations, int k)
        {
            var random = new Random();
            double[][] centroids = new double[k][];
            for (int i = 0; i < k; i++)
            {
                centroids[i] = observations[random.Next(observations.Length)];
            }
            return centroids;
        }

        private static int ClosestCentroid(double[] observation, double[][] centroids)
        {
            int label = 0;
            double minDistance = Distance(observation, centroids[0]);

            for (int i = 1; i < centroids.Length; i++)
            {
                double distance = Distance(observation, centroids[i]);
                if (distance < minDistance)
                {
                    minDistance = distance;
                    label = i;
                }
            }

            return label;
        }

        private static void UpdateCentroids(double[][] observations, int[] labels, int k, double[][] centroids)
        {
            int[] counts = new int[k];
            double[][] newCentroids = new double[k][];
            for (int i = 0; i < k; i++)
            {
                newCentroids[i] = new double[observations[0].Length];
            }

            for (int i = 0; i < observations.Length; i++)
            {
                int label = labels[i];
                for (int j = 0; j < observations[i].Length; j++)
                {
                    newCentroids[label][j] += observations[i][j];
                }
                counts[label]++;
            }

            for (int i = 0; i < k; i++)
            {
                if (counts[i] > 0)
                {
                    for (int j = 0; j < newCentroids[i].Length; j++)
                    {
                        newCentroids[i][j] /= counts[i];
                    }
                }
                else
                {
                    newCentroids[i] = centroids[i]; // Nếu không có điểm nào trong cụm, giữ nguyên tâm cụm cũ
                }
            }

            Array.Copy(newCentroids, centroids, k);
        }

        private static double Distance(double[] observation, double[] centroid)
        {
            double sum = 0;
            for (int i = 0; i < observation.Length; i++)
            {
                sum += Math.Pow(observation[i] - centroid[i], 2);
            }
            return Math.Sqrt(sum);
        }

        private static string GetGroupName(int purchaseCount, double totalFee, double[] centroid)
        {
            double target = 1000000; // Mục tiêu chi phí

            bool highValue = totalFee > target;
            bool frequent = purchaseCount >= 3;

            // Phân loại dựa trên các tiêu chí đã xác định
            if (frequent && highValue)
                return "Nhóm khách mua hàng thường xuyên, tổng giá trị cao(1 tháng)";
            if (!frequent && !highValue)
                return "Nhóm khách hàng ít mua hàng, tổng giá trị thấp(1 tháng)";
            if (frequent && !highValue)
                return "Nhóm khách hàng mua hàng thường xuyên, tổng giá trị thấp(1 tháng)";
            if (!frequent && highValue)
                return "Nhóm khách hàng ít mua hàng, tổng giá trị cao(1 tháng)";

            // Trong trường hợp không thuộc bất kỳ nhóm nào
            return "Nhóm không xác định";
        }
    }
}
