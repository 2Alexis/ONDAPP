import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import {
  Zap,
  Trophy,
  Star,
  Clock,
  MapPin,
  Filter,
  Plus
} from 'lucide-react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const SAMPLE_MISSIONS = [
  {
    id: 1,
    title: 'Nettoyage du parc local',
    description: 'Rejoignez-nous pour nettoyer le parc de votre quartier',
    vibes: 50,
    duration: '2h',
    location: 'Parc Central',
    category: 'Environnement',
    image: 'https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    title: 'Aide alimentaire',
    description: 'Distribution de repas aux personnes dans le besoin',
    vibes: 75,
    duration: '3h',
    location: 'Centre-ville',
    category: 'Social',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    title: 'Plantation d\'arbres',
    description: 'Aidez à verdir votre quartier en plantant des arbres',
    vibes: 100,
    duration: '4h',
    location: 'Forêt urbaine',
    category: 'Environnement',
    image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState('Toutes');
  
  const userStats = {
    vibes: 1250,
    level: 8,
    badges: 12,
    missionsCompleted: 23,
  };

  const filters = ['Toutes', 'Environnement', 'Social', 'Éducation', 'Santé'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour, Alex ! 👋</Text>
            <Text style={styles.subGreeting}>Prêt à faire la différence aujourd'hui ?</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Zap size={isTablet ? 32 : 24} color="#d4af37" />
              <Text style={styles.statNumber}>{userStats.vibes}</Text>
              <Text style={styles.statLabel}>Vibes</Text>
            </View>
            <View style={styles.statItem}>
              <Star size={isTablet ? 32 : 24} color="#d4af37" />
              <Text style={styles.statNumber}>Niveau {userStats.level}</Text>
              <Text style={styles.statLabel}>Progression</Text>
            </View>
            <View style={styles.statItem}>
              <Trophy size={isTablet ? 32 : 24} color="#d4af37" />
              <Text style={styles.statNumber}>{userStats.badges}</Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>
          </View>
        </View>

        {/* Mission Filters */}
        <View style={styles.filtersSection}>
          <Text style={styles.sectionTitle}>Missions recommandées</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
            contentContainerStyle={styles.filtersContent}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Mission Cards */}
        <View style={styles.missionsContainer}>
          {SAMPLE_MISSIONS.map((mission) => (
            <TouchableOpacity key={mission.id} style={styles.missionCard}>
              <Image source={{ uri: mission.image }} style={styles.missionImage} />
              <View style={styles.missionOverlay}>
                <View style={styles.missionCategory}>
                  <Text style={styles.categoryText}>{mission.category}</Text>
                </View>
              </View>
              <View style={styles.missionContent}>
                <Text style={styles.missionTitle}>{mission.title}</Text>
                <Text style={styles.missionDescription}>{mission.description}</Text>
                
                <View style={styles.missionMeta}>
                  <View style={styles.metaItem}>
                    <Clock size={16} color="#666" />
                    <Text style={styles.metaText}>{mission.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <MapPin size={16} color="#666" />
                    <Text style={styles.metaText}>{mission.location}</Text>
                  </View>
                </View>

                <View style={styles.missionFooter}>
                  <View style={styles.vibesContainer}>
                    <Zap size={18} color="#d4af37" />
                    <Text style={styles.vibesText}>+{mission.vibes} vibes</Text>
                  </View>
                  <TouchableOpacity style={styles.joinButton}>
                    <Plus size={18} color="#fff" />
                    <Text style={styles.joinButtonText}>Rejoindre</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <MapPin size={isTablet ? 40 : 32} color="#d4af37" />
              <Text style={styles.actionText}>Cercles près de moi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Filter size={isTablet ? 40 : 32} color="#d4af37" />
              <Text style={styles.actionText}>Filtrer missions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingBottom: Platform.select({
      ios: 120,
      android: 90,
      default: 90,
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isTablet ? 40 : 20,
    paddingTop: Platform.select({
      ios: 10,
      android: 20,
      default: 20,
    }),
    paddingBottom: 20,
  },
  greeting: {
    fontSize: isTablet ? 32 : 24,
    fontWeight: 'bold',
    color: '#1b1f4a',
  },
  subGreeting: {
    fontSize: isTablet ? 20 : 16,
    color: '#666',
    marginTop: 4,
  },
  notificationButton: {
    width: isTablet ? 50 : 40,
    height: isTablet ? 50 : 40,
    borderRadius: isTablet ? 25 : 20,
    backgroundColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: isTablet ? 10 : 8,
    right: isTablet ? 10 : 8,
    width: isTablet ? 10 : 8,
    height: isTablet ? 10 : 8,
    borderRadius: isTablet ? 5 : 4,
    backgroundColor: '#ff4757',
  },
  statsContainer: {
    paddingHorizontal: isTablet ? 40 : 20,
    marginBottom: 24,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: isTablet ? 30 : 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: 'bold',
    color: '#1b1f4a',
    marginTop: 8,
  },
  statLabel: {
    fontSize: isTablet ? 14 : 12,
    color: '#666',
    marginTop: 4,
  },
  filtersSection: {
    paddingHorizontal: isTablet ? 40 : 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: 'bold',
    color: '#1b1f4a',
    marginBottom: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filtersContent: {
    paddingRight: isTablet ? 40 : 20,
  },
  filterButton: {
    paddingHorizontal: isTablet ? 20 : 16,
    paddingVertical: isTablet ? 12 : 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },
  filterButtonActive: {
    backgroundColor: '#d4af37',
    borderColor: '#d4af37',
  },
  filterText: {
    fontSize: isTablet ? 16 : 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  missionsContainer: {
    paddingHorizontal: isTablet ? 40 : 20,
  },
  missionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    maxWidth: isTablet ? 600 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
    width: isTablet ? '100%' : 'auto',
  },
  missionImage: {
    width: '100%',
    height: isTablet ? 250 : 200,
  },
  missionOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  missionCategory: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: isTablet ? 14 : 12,
    fontWeight: '600',
  },
  missionContent: {
    padding: isTablet ? 24 : 16,
  },
  missionTitle: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: 'bold',
    color: '#1b1f4a',
    marginBottom: 8,
  },
  missionDescription: {
    fontSize: isTablet ? 16 : 14,
    color: '#666',
    lineHeight: isTablet ? 24 : 20,
    marginBottom: 12,
  },
  missionMeta: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: isTablet ? 14 : 12,
    color: '#666',
    marginLeft: 4,
  },
  missionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vibesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vibesText: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: 'bold',
    color: '#d4af37',
    marginLeft: 4,
  },
  joinButton: {
    backgroundColor: '#1b1f4a',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: isTablet ? 20 : 16,
    paddingVertical: isTablet ? 12 : 8,
    borderRadius: 20,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: isTablet ? 16 : 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  quickActions: {
    paddingHorizontal: isTablet ? 40 : 20,
    marginTop: 32,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: isTablet ? 600 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
  },
  actionCard: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 4,
    padding: isTablet ? 30 : 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionText: {
    fontSize: isTablet ? 14 : 12,
    color: '#1b1f4a',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
});