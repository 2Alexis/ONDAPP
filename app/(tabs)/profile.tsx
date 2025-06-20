import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { User, Settings, Zap, Trophy, Target, Calendar, MapPin, Star, Award, TrendingUp, Gift, CreditCard as Edit } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const USER_BADGES = [
  { id: 1, name: 'Eco-warrior', description: '10 missions environnement', icon: '🌱', earned: true },
  { id: 2, name: 'Solidaire', description: '5 missions sociales', icon: '🤝', earned: true },
  { id: 3, name: 'Mentor', description: '3 missions éducation', icon: '📚', earned: true },
  { id: 4, name: 'Leader', description: 'Créer un cercle', icon: '👑', earned: false },
  { id: 5, name: 'Marathonien', description: '50 missions terminées', icon: '🏃', earned: false },
  { id: 6, name: 'Influenceur', description: '100 partages', icon: '📢', earned: false },
];

const RECENT_MISSIONS = [
  {
    id: 1,
    title: 'Nettoyage du parc',
    date: 'Il y a 2 jours',
    vibes: 50,
    status: 'completed',
    image: 'https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 2,
    title: 'Aide alimentaire',
    date: 'Il y a 1 semaine',
    vibes: 75,
    status: 'completed',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 3,
    title: 'Soutien scolaire',
    date: 'Il y a 2 semaines',
    vibes: 60,
    status: 'completed',
    image: 'https://images.pexels.com/photos/8471832/pexels-photo-8471832.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'stats' | 'badges' | 'missions'>('stats');

  const userProfile = {
    name: 'Alex Dubois',
    bio: 'Passionné par l\'impact social et l\'environnement. Membre ONDA depuis 6 mois.',
    level: 8,
    vibes: 1847,
    nextLevelVibes: 2000,
    totalMissions: 23,
    completedMissions: 18,
    badges: 12,
    joinDate: 'Juin 2024',
    location: 'Paris, France',
  };

  const progressPercentage = (userProfile.vibes / userProfile.nextLevelVibes) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AD</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userProfile.name}</Text>
              <Text style={styles.userBio}>{userProfile.bio}</Text>
              <View style={styles.userMeta}>
                <View style={styles.metaItem}>
                  <Calendar size={14} color="#666" />
                  <Text style={styles.metaText}>Rejoint en {userProfile.joinDate}</Text>
                </View>
                <View style={styles.metaItem}>
                  <MapPin size={14} color="#666" />
                  <Text style={styles.metaText}>{userProfile.location}</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={isTablet ? 24 : 20} color="#1b1f4a" />
          </TouchableOpacity>
        </View>

        {/* Level Progress */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View style={styles.levelInfo}>
              <Text style={styles.levelText}>Niveau {userProfile.level}</Text>
              <View style={styles.vibesContainer}>
                <Zap size={isTablet ? 22 : 18} color="#d4af37" />
                <Text style={styles.vibesText}>{userProfile.vibes} vibes</Text>
              </View>
            </View>
            <View style={styles.nextLevel}>
              <Text style={styles.nextLevelText}>
                {userProfile.nextLevelVibes - userProfile.vibes} vibes jusqu'au niveau {userProfile.level + 1}
              </Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.statItem}>
            <Target size={isTablet ? 32 : 24} color="#d4af37" />
            <Text style={styles.statNumber}>{userProfile.completedMissions}</Text>
            <Text style={styles.statLabel}>Missions terminées</Text>
          </View>
          <View style={styles.statItem}>
            <Trophy size={isTablet ? 32 : 24} color="#d4af37" />
            <Text style={styles.statNumber}>{userProfile.badges}</Text>
            <Text style={styles.statLabel}>Badges obtenus</Text>
          </View>
          <View style={styles.statItem}>
            <Star size={isTablet ? 32 : 24} color="#d4af37" />
            <Text style={styles.statNumber}>{userProfile.level}</Text>
            <Text style={styles.statLabel}>Niveau actuel</Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabNavigation}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'stats' && styles.tabButtonActive]}
            onPress={() => setActiveTab('stats')}
          >
            <TrendingUp size={20} color={activeTab === 'stats' ? '#d4af37' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'stats' && styles.tabTextActive]}>
              Statistiques
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'badges' && styles.tabButtonActive]}
            onPress={() => setActiveTab('badges')}
          >
            <Award size={20} color={activeTab === 'badges' ? '#d4af37' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'badges' && styles.tabTextActive]}>
              Badges
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'missions' && styles.tabButtonActive]}
            onPress={() => setActiveTab('missions')}
          >
            <Target size={20} color={activeTab === 'missions' ? '#d4af37' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'missions' && styles.tabTextActive]}>
              Historique
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'stats' && (
          <View style={styles.tabContent}>
            <View style={styles.statsGrid}>
              <View style={styles.statsCard}>
                <Text style={styles.statsTitle}>Cette semaine</Text>
                <View style={styles.statsRow}>
                  <Text style={styles.statsLabel}>Missions terminées</Text>
                  <Text style={styles.statsValue}>3</Text>
                </View>
                <View style={styles.statsRow}>
                  <Text style={styles.statsLabel}>Vibes gagnées</Text>
                  <Text style={styles.statsValue}>185</Text>
                </View>
                <View style={styles.statsRow}>
                  <Text style={styles.statsLabel}>Temps consacré</Text>
                  <Text style={styles.statsValue}>8h</Text>
                </View>
              </View>

              <View style={styles.statsCard}>
                <Text style={styles.statsTitle}>Ce mois-ci</Text>
                <View style={styles.statsRow}>
                  <Text style={styles.statsLabel}>Missions terminées</Text>
                  <Text style={styles.statsValue}>12</Text>
                </View>
                <View style={styles.statsRow}>
                  <Text style={styles.statsLabel}>Vibes gagnées</Text>
                  <Text style={styles.statsValue}>720</Text>
                </View>
                <View style={styles.statsRow}>
                  <Text style={styles.statsLabel}>Nouveau badges</Text>
                  <Text style={styles.statsValue}>2</Text>
                </View>
              </View>
            </View>

            <View style={styles.impactCard}>
              <Text style={styles.impactTitle}>Votre impact ONDA</Text>
              <View style={styles.impactStats}>
                <View style={styles.impactItem}>
                  <Text style={styles.impactNumber}>127</Text>
                  <Text style={styles.impactLabel}>Personnes aidées</Text>
                </View>
                <View style={styles.impactItem}>
                  <Text style={styles.impactNumber}>85kg</Text>
                  <Text style={styles.impactLabel}>Déchets collectés</Text>
                </View>
                <View style={styles.impactItem}>
                  <Text style={styles.impactNumber}>24h</Text>
                  <Text style={styles.impactLabel}>Cours dispensés</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'badges' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>
              Vos badges ({USER_BADGES.filter(b => b.earned).length}/{USER_BADGES.length})
            </Text>
            <View style={styles.badgesGrid}>
              {USER_BADGES.map((badge) => (
                <View
                  key={badge.id}
                  style={[styles.badgeItem, !badge.earned && styles.badgeItemLocked]}
                >
                  <Text style={styles.badgeIcon}>{badge.icon}</Text>
                  <Text style={[styles.badgeName, !badge.earned && styles.badgeNameLocked]}>
                    {badge.name}
                  </Text>
                  <Text style={[styles.badgeDescription, !badge.earned && styles.badgeDescriptionLocked]}>
                    {badge.description}
                  </Text>
                  {!badge.earned && <View style={styles.lockOverlay} />}
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'missions' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Missions récentes</Text>
            {RECENT_MISSIONS.map((mission) => (
              <View key={mission.id} style={styles.missionItem}>
                <Image source={{ uri: mission.image }} style={styles.missionImage} />
                <View style={styles.missionInfo}>
                  <Text style={styles.missionTitle}>{mission.title}</Text>
                  <Text style={styles.missionDate}>{mission.date}</Text>
                  <View style={styles.missionVibes}>
                    <Zap size={16} color="#d4af37" />
                    <Text style={styles.missionVibesText}>+{mission.vibes} vibes</Text>
                  </View>
                </View>
                <View style={styles.missionStatus}>
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedText}>✓</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Vibes Shop Teaser */}
        <View style={styles.shopTeaser}>
          <Gift size={isTablet ? 40 : 32} color="#d4af37" />
          <Text style={styles.shopTitle}>Boutique Vibes</Text>
          <Text style={styles.shopDescription}>
            Échangez vos vibes contre des récompenses exclusives
          </Text>
          <TouchableOpacity style={styles.shopButton}>
            <Text style={styles.shopButtonText}>Bientôt disponible</Text>
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={isTablet ? 28 : 24} color="#666" />
          <Text style={styles.settingsText}>Paramètres</Text>
        </TouchableOpacity>
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
  profileHeader: {
    backgroundColor: '#fff',
    padding: isTablet ? 30 : 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: Platform.select({
      ios: 0,
      android: 10,
      default: 10,
    }),
  },
  profileInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar: {
    width: isTablet ? 100 : 80,
    height: isTablet ? 100 : 80,
    borderRadius: isTablet ? 50 : 40,
    backgroundColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: isTablet ? 36 : 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: isTablet ? 28 : 24,
    fontWeight: 'bold',
    color: '#1b1f4a',
    marginBottom: 8,
  },
  userBio: {
    fontSize: isTablet ? 16 : 14,
    color: '#666',
    lineHeight: isTablet ? 24 : 20,
    marginBottom: 12,
  },
  userMeta: {
    flexDirection: 'column',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    fontSize: isTablet ? 14 : 12,
    color: '#666',
    marginLeft: 6,
  },
  editButton: {
    padding: 8,
  },
  levelCard: {
    backgroundColor: '#fff',
    margin: isTablet ? 30 : 20,
    padding: isTablet ? 30 : 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    maxWidth: isTablet ? 600 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
    width: isTablet ? '90%' : 'auto',
  },
  levelHeader: {
    marginBottom: 16,
  },
  levelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelText: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: 'bold',
    color: '#1b1f4a',
  },
  vibesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vibesText: {
    fontSize: isTablet ? 20 : 16,
    fontWeight: 'bold',
    color: '#d4af37',
    marginLeft: 4,
  },
  nextLevel: {
    alignItems: 'center',
  },
  nextLevelText: {
    fontSize: isTablet ? 14 : 12,
    color: '#666',
  },
  progressBar: {
    height: isTablet ? 10 : 8,
    backgroundColor: '#e1e8ed',
    borderRadius: isTablet ? 5 : 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#d4af37',
    borderRadius: isTablet ? 5 : 4,
  },
  quickStats: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: isTablet ? 30 : 20,
    marginBottom: 16,
    padding: isTablet ? 30 : 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    maxWidth: isTablet ? 600 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
    width: isTablet ? '90%' : 'auto',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: 'bold',
    color: '#1b1f4a',
    marginTop: 8,
  },
  statLabel: {
    fontSize: isTablet ? 14 : 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: isTablet ? 30 : 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: isTablet ? 600 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
    width: isTablet ? '90%' : 'auto',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isTablet ? 16 : 12,
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#f8f9fa',
  },
  tabText: {
    fontSize: isTablet ? 14 : 12,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#d4af37',
    fontWeight: '600',
  },
  tabContent: {
    paddingHorizontal: isTablet ? 30 : 20,
    maxWidth: isTablet ? 600 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
    width: isTablet ? '90%' : 'auto',
  },
  statsGrid: {
    flexDirection: isTablet ? 'row' : 'column',
    marginBottom: 16,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: isTablet ? 24 : 16,
    borderRadius: 12,
    marginHorizontal: isTablet ? 4 : 0,
    marginBottom: isTablet ? 0 : 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsTitle: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: '600',
    color: '#1b1f4a',
    marginBottom: 12,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statsLabel: {
    fontSize: isTablet ? 14 : 12,
    color: '#666',
  },
  statsValue: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: 'bold',
    color: '#1b1f4a',
  },
  impactCard: {
    backgroundColor: '#fff',
    padding: isTablet ? 30 : 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  impactTitle: {
    fontSize: isTablet ? 20 : 16,
    fontWeight: 'bold',
    color: '#1b1f4a',
    marginBottom: 16,
    textAlign: 'center',
  },
  impactStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  impactItem: {
    alignItems: 'center',
  },
  impactNumber: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: 'bold',
    color: '#d4af37',
  },
  impactLabel: {
    fontSize: isTablet ? 13 : 11,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: 'bold',
    color: '#1b1f4a',
    marginBottom: 16,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeItem: {
    width: isTablet ? '31%' : '48%',
    backgroundColor: '#fff',
    padding: isTablet ? 24 : 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  badgeItemLocked: {
    opacity: 0.5,
  },
  badgeIcon: {
    fontSize: isTablet ? 40 : 32,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: 'bold',
    color: '#1b1f4a',
    marginBottom: 4,
    textAlign: 'center',
  },
  badgeNameLocked: {
    color: '#999',
  },
  badgeDescription: {
    fontSize: isTablet ? 13 : 11,
    color: '#666',
    textAlign: 'center',
  },
  badgeDescriptionLocked: {
    color: '#ccc',
  },
  lockOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  missionItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: isTablet ? 16 : 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  missionImage: {
    width: isTablet ? 60 : 50,
    height: isTablet ? 60 : 50,
    borderRadius: 8,
    marginRight: 12,
  },
  missionInfo: {
    flex: 1,
  },
  missionTitle: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: '600',
    color: '#1b1f4a',
    marginBottom: 4,
  },
  missionDate: {
    fontSize: isTablet ? 14 : 12,
    color: '#666',
    marginBottom: 4,
  },
  missionVibes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  missionVibesText: {
    fontSize: isTablet ? 14 : 12,
    fontWeight: 'bold',
    color: '#d4af37',
    marginLeft: 4,
  },
  missionStatus: {
    marginLeft: 12,
  },
  completedBadge: {
    width: isTablet ? 32 : 24,
    height: isTablet ? 32 : 24,
    borderRadius: isTablet ? 16 : 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedText: {
    color: '#fff',
    fontSize: isTablet ? 14 : 12,
    fontWeight: 'bold',
  },
  shopTeaser: {
    backgroundColor: '#fff',
    margin: isTablet ? 30 : 20,
    padding: isTablet ? 30 : 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    maxWidth: isTablet ? 600 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
    width: isTablet ? '90%' : 'auto',
  },
  shopTitle: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: 'bold',
    color: '#1b1f4a',
    marginTop: 12,
    marginBottom: 8,
  },
  shopDescription: {
    fontSize: isTablet ? 16 : 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  shopButton: {
    backgroundColor: '#e1e8ed',
    paddingHorizontal: isTablet ? 32 : 24,
    paddingVertical: isTablet ? 16 : 12,
    borderRadius: 24,
  },
  shopButtonText: {
    color: '#666',
    fontSize: isTablet ? 16 : 14,
    fontWeight: '600',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: isTablet ? 30 : 20,
    padding: isTablet ? 20 : 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: isTablet ? 600 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
    width: isTablet ? '90%' : 'auto',
  },
  settingsText: {
    fontSize: isTablet ? 18 : 16,
    color: '#666',
    marginLeft: 12,
  },
});