import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Filter, Clock, MapPin, Zap, Plus, Camera, CircleCheck as CheckCircle } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const ALL_MISSIONS = [
  {
    id: 1,
    title: 'Nettoyage du parc local',
    description: 'Rejoignez-nous pour nettoyer le parc de votre quartier et préserver notre environnement local.',
    vibes: 50,
    duration: '2h',
    location: 'Parc Central',
    category: 'Environnement',
    difficulty: 'Facile',
    participants: 12,
    maxParticipants: 20,
    status: 'available',
    image: 'https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    title: 'Aide alimentaire',
    description: 'Distribution de repas aux personnes dans le besoin au centre-ville.',
    vibes: 75,
    duration: '3h',
    location: 'Centre-ville',
    category: 'Social',
    difficulty: 'Moyen',
    participants: 8,
    maxParticipants: 15,
    status: 'available',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    title: 'Plantation d\'arbres',
    description: 'Aidez à verdir votre quartier en plantant des arbres dans la forêt urbaine.',
    vibes: 100,
    duration: '4h',
    location: 'Forêt urbaine',
    category: 'Environnement',
    difficulty: 'Difficile',
    participants: 5,
    maxParticipants: 10,
    status: 'available',
    image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    title: 'Cours de soutien scolaire',
    description: 'Aidez des enfants en difficulté avec leurs devoirs et leçons.',
    vibes: 60,
    duration: '2h',
    location: 'École primaire',
    category: 'Éducation',
    difficulty: 'Moyen',
    participants: 15,
    maxParticipants: 15,
    status: 'completed',
    image: 'https://images.pexels.com/photos/8471832/pexels-photo-8471832.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 5,
    title: 'Visite aux personnes âgées',
    description: 'Rendez visite aux résidents d\'une maison de retraite pour leur apporter de la joie.',
    vibes: 80,
    duration: '3h',
    location: 'Maison de retraite Les Lilas',
    category: 'Social',
    difficulty: 'Facile',
    participants: 3,
    maxParticipants: 8,
    status: 'in_progress',
    image: 'https://images.pexels.com/photos/7551667/pexels-photo-7551667.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function MissionsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const insets = useSafeAreaInsets();

  const categories = ['Toutes', 'Environnement', 'Social', 'Éducation', 'Santé'];

  const filteredMissions = ALL_MISSIONS.filter(mission => {
    const matchesCategory = selectedCategory === 'Toutes' || mission.category === selectedCategory;
    const matchesSearch = mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mission.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = showCompleted || mission.status !== 'completed';
    
    return matchesCategory && matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#4CAF50';
      case 'in_progress': return '#FF9800';
      case 'completed': return '#2196F3';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'in_progress': return 'En cours';
      case 'completed': return 'Terminée';
      default: return '';
    }
  };

  const handleSubmitProof = (missionId: number) => {
    console.log('Submit proof for mission:', missionId);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Missions ONDA</Text>
        <TouchableOpacity style={styles.filterToggle}>
          <Filter size={isTablet ? 28 : 24} color="#1b1f4a" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une mission..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Toggle for completed missions */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowCompleted(!showCompleted)}
        >
          <CheckCircle 
            size={20} 
            color={showCompleted ? '#d4af37' : '#666'} 
          />
          <Text style={[
            styles.toggleText,
            showCompleted && styles.toggleTextActive
          ]}>
            Afficher les missions terminées
          </Text>
        </TouchableOpacity>
      </View>

      {/* Missions List */}
      <ScrollView 
        style={styles.missionsList} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.missionsContent,
          { 
            paddingBottom: Platform.select({
              ios: 120 + insets.bottom,
              android: 100,
              default: 100,
            })
          }
        ]}
      >
        {filteredMissions.map((mission) => (
          <TouchableOpacity key={mission.id} style={styles.missionCard}>
            <Image source={{ uri: mission.image }} style={styles.missionImage} />
            
            <View style={styles.statusBadge}>
              <View 
                style={[
                  styles.statusIndicator, 
                  { backgroundColor: getStatusColor(mission.status) }
                ]} 
              />
              <Text style={styles.statusText}>
                {getStatusText(mission.status)}
              </Text>
            </View>

            <View style={styles.missionContent}>
              <View style={styles.missionHeader}>
                <Text style={styles.missionTitle}>{mission.title}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{mission.category}</Text>
                </View>
              </View>

              <Text style={styles.missionDescription}>{mission.description}</Text>

              <View style={styles.missionMeta}>
                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Clock size={16} color="#666" />
                    <Text style={styles.metaText}>{mission.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <MapPin size={16} color="#666" />
                    <Text style={styles.metaText}>{mission.location}</Text>
                  </View>
                </View>
                
                <View style={styles.participantsInfo}>
                  <Text style={styles.participantsText}>
                    {mission.participants}/{mission.maxParticipants} participants
                  </Text>
                  <View style={styles.difficultyBadge}>
                    <Text style={styles.difficultyText}>{mission.difficulty}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.missionFooter}>
                <View style={styles.vibesContainer}>
                  <Zap size={18} color="#d4af37" />
                  <Text style={styles.vibesText}>+{mission.vibes} vibes</Text>
                </View>

                {mission.status === 'available' && (
                  <TouchableOpacity style={styles.joinButton}>
                    <Plus size={18} color="#fff" />
                    <Text style={styles.joinButtonText}>Rejoindre</Text>
                  </TouchableOpacity>
                )}

                {mission.status === 'in_progress' && (
                  <TouchableOpacity 
                    style={styles.proofButton}
                    onPress={() => handleSubmitProof(mission.id)}
                  >
                    <Camera size={18} color="#fff" />
                    <Text style={styles.proofButtonText}>Soumettre preuve</Text>
                  </TouchableOpacity>
                )}

                {mission.status === 'completed' && (
                  <View style={styles.completedBadge}>
                    <CheckCircle size={18} color="#4CAF50" />
                    <Text style={styles.completedText}>Terminée</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isTablet ? 40 : 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: isTablet ? 32 : 24,
    fontWeight: 'bold',
    color: '#1b1f4a',
  },
  filterToggle: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: isTablet ? 40 : 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: isTablet ? 16 : 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: isTablet ? 18 : 16,
    color: '#333',
  },
  filtersContainer: {
    paddingHorizontal: isTablet ? 40 : 20,
    marginBottom: 16,
  },
  filtersContent: {
    paddingRight: isTablet ? 40 : 20,
  },
  categoryButton: {
    paddingHorizontal: isTablet ? 20 : 16,
    paddingVertical: isTablet ? 12 : 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },
  categoryButtonActive: {
    backgroundColor: '#d4af37',
    borderColor: '#d4af37',
  },
  categoryText: {
    fontSize: isTablet ? 16 : 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  toggleContainer: {
    paddingHorizontal: isTablet ? 40 : 20,
    marginBottom: 16,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: isTablet ? 16 : 14,
    color: '#666',
    marginLeft: 8,
  },
  toggleTextActive: {
    color: '#d4af37',
    fontWeight: '600',
  },
  missionsList: {
    flex: 1,
  },
  missionsContent: {
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
    maxWidth: isTablet ? 700 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
    width: isTablet ? '100%' : 'auto',
  },
  missionImage: {
    width: '100%',
    height: isTablet ? 220 : 180,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: isTablet ? 14 : 12,
    fontWeight: '600',
  },
  missionContent: {
    padding: isTablet ? 24 : 16,
  },
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  missionTitle: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: 'bold',
    color: '#1b1f4a',
    flex: 1,
    marginRight: 12,
  },
  categoryBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: isTablet ? 14 : 12,
    color: '#1976d2',
    fontWeight: '600',
  },
  missionDescription: {
    fontSize: isTablet ? 16 : 14,
    color: '#666',
    lineHeight: isTablet ? 24 : 20,
    marginBottom: 12,
  },
  missionMeta: {
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 8,
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
  participantsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantsText: {
    fontSize: isTablet ? 14 : 12,
    color: '#666',
  },
  difficultyBadge: {
    backgroundColor: '#fff3e0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: isTablet ? 12 : 11,
    color: '#f57c00',
    fontWeight: '600',
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
  proofButton: {
    backgroundColor: '#FF9800',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: isTablet ? 20 : 16,
    paddingVertical: isTablet ? 12 : 8,
    borderRadius: 20,
  },
  proofButtonText: {
    color: '#fff',
    fontSize: isTablet ? 16 : 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    color: '#4CAF50',
    fontSize: isTablet ? 16 : 14,
    fontWeight: '600',
    marginLeft: 4,
  },
});