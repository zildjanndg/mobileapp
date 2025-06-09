import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChartBar as BarChart3, Database, TrendingUp, Users } from 'lucide-react-native';
import { dataService, DataItem } from '@/services/dataService';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const [items, setItems] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    categories: 0,
    recent: 0,
  });

  useEffect(() => {
    const unsubscribe = dataService.subscribeToItems((fetchedItems) => {
      setItems(fetchedItems);
      calculateStats(fetchedItems);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const calculateStats = (items: DataItem[]) => {
    const categories = new Set(items.map(item => item.category)).size;
    const recent = items.filter(item => {
      const dayAgo = new Date();
      dayAgo.setDate(dayAgo.getDate() - 1);
      return item.createdAt.toDate() > dayAgo;
    }).length;

    setStats({
      total: items.length,
      categories,
      recent,
    });
  };

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        <Text style={styles.statTitle}>{title}</Text>
        <Icon size={24} color={color} />
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );

  const RecentItem = ({ item }: { item: DataItem }) => (
    <View style={styles.recentItem}>
      <View style={styles.recentItemHeader}>
        <Text style={styles.recentItemTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.recentItemCategory}>{item.category}</Text>
      </View>
      <Text style={styles.recentItemDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <Text style={styles.recentItemDate}>
        {item.createdAt.toDate().toLocaleDateString()}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Data Management Overview</Text>
        </View>

        <View style={styles.statsContainer}>
          <StatCard
            title="Total Items"
            value={stats.total}
            icon={Database}
            color="#2563eb"
          />
          <StatCard
            title="Categories"
            value={stats.categories}
            icon={BarChart3}
            color="#10b981"
          />
          <StatCard
            title="Recent (24h)"
            value={stats.recent}
            icon={TrendingUp}
            color="#f59e0b"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Items</Text>
          {items.length > 0 ? (
            items.slice(0, 5).map((item) => (
              <RecentItem key={item.id} item={item} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Database size={48} color="#9ca3af" />
              <Text style={styles.emptyStateText}>No data items yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Start by adding some data in the Add Data tab
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  recentItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recentItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recentItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
    marginRight: 12,
  },
  recentItemCategory: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2563eb',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  recentItemDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  recentItemDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9ca3af',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
});