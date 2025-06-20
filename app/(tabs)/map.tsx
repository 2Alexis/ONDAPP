import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  MapPin,
  Users,
  Navigation,
  Zap,
  Clock,
  Calendar,
} from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const SAMPLE_CIRCLES = [
  {
    id: 1,
    name: 'Cercle Central Paris',
    location: 'Paris 1er arrondissement',
    members: 156,
    distance: '0.5 km',
    activeMissions: 8,
    coordinates: { lat: 48.8566, lng: 2.3522 },
    description: 'Cercle actif au cœur de Paris, focalisé sur l\'environnement urbain.',
    nextEvent: 'Nettoyage Seine - Demain 14h',
    vibes: 2850,
  },
  {
    id: 2,
    name: 'Cercle Belleville',
    location: 'Paris 11ème arrondissement',
    members: 89,
    distance: '1.2 km',
    activeMissions: 5,
    coordinates: { lat: 48.8566, lng: 2.3522 },
    description: 'Communauté solidaire axée sur l\'aide sociale et l\'éducation.',
    nextEvent: 'Cours de soutien - Vendredi 16h',
    vibes: 1920,
  },
  {
    id: 3,
    name: 'Cercle Montmartre',
    location: 'Paris 18ème arrondissement',
    members: 124,
    distance: '2.1 km',
    activeMissions: 12,
    coordinates: { lat: 48.8566, lng: 2.3522 },
    description: 'Cercle artistique engagé dans la culture et le social.',
    nextEvent: 'Atelier créatif - Samedi 10h',
    vibes: 3240,
  },
  {
    id: 4,
    name: 'Cercle Bois de Vincennes',
    location: 'Paris 12ème arrondissement',
    members: 73,
    distance: '3.8 km',
    activeMissions: 6,
    coordinates: { lat: 48.8566, lng: 2.3522 },
    description: 'Nature et environnement au cœur de nos actions.',
    nextEvent: 'Plantation arbres - Dimanche 9h',
    vibes: 1650,
  },
];

export default function MapScreen() {
  const [selectedCircle, setSelectedCircle] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const insets = useSafeAreaInsets();

  const handleJoinCircle = (circleId: number) => {
    console.log('Joining circle:', circleId);
  };

  const handleNavigateToCircle = (circleId: number) => {
    console.log('Navigate to circle:', circleId);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cercles ONDA</Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'map' && styles.toggleButtonActive,
            ]}
            onPress={() => setViewMode('map')}
          >
            <MapPin size={20} color={viewMode === 'map' ? '#fff' : '#666'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'list' && styles.toggleButtonActive,
            ]}
            onPress={() => setViewMode('list')}
          >
            <Users size={20} color={viewMode === 'list' ? '#fff' : '#666'} />
          </TouchableOpacity>
        </View>
      </View>

      {viewMode === 'map' ? (
        <View style={styles.mapPlaceholder}>
          <MapPin size={isTablet ? 80 : 64} color="#d4af37" />
          <Text style={styles.mapPlaceholderText}>
            Carte interactive des cercles
          </Text>
          <Text style={styles.mapPlaceholderSubtext}>
            Fonctionnalité en développement
          </Text>
          <TouchableOpacity 
            style={styles.switchToListButton}
            onPress={() => setViewMode('list')}
          >
            <Text style={styles.switchToListText}>Voir la liste</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView 
          style={styles.circlesList} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.circlesContent,
            { 
              paddingBottom: Platform.select({
                ios: 120 + insets.bottom,
                android: 100,
                default: 100,
              })
            }
          ]}
        >
          <View style={styles.locationHeader}>
            <View style={styles.currentLocation}>
              <Navigation size={20} color="#d4af37" />
              <Text style={styles.locationText}>Paris, France</Text>
            </View>
            <Text style={styles.circlesCount}>
              {SAMPLE_CIRCLES.length} cercles près de vous
            </Text>
          </View>

          {SAMPLE_CIRCLES.map((circle) => (
            <TouchableOpacity
              key={circle.id}
              style={[
                styles.circleCard,
                selectedCircle === circle.id && styles.circleCardSelected,
              ]}
              onPress={() => setSelectedCircle(
                selectedCircle === circle.id ? null : circle.id
              )}
            >
              <View style={styles.circleHeader}>
                <View style={styles.circleMainInfo}>
                  <Text style={styles.circleName}>{circle.name}</Text>
                  <Text style={styles.circleLocation}>{circle.location}</Text>
                </View>
                <View style={styles.circleStats}>
                  <Text style={styles.distanceText}>{circle.distance}</Text>
                  <View style={styles.vibesIndicator}>
                    <Zap size={16} color="#d4af37" />
                    <Text style={styles.vibesCount}>{circle.vibes}</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.circleDescription}>{circle.description}</Text>

              <View style={styles.circleMetrics}>
                <View style={styles.metric}>
                  <Users size={18} color="#666" />
                  <Text style={styles.metricText}>{circle.members} membres</Text>
                </View>
                <View style={styles.metric}>
                  <Clock size={18} color="#666" />
                  <Text style={styles.metricText}>{circle.activeMissions} missions actives</Text>
                </View>
              </View>

              {circle.nextEvent && (
                <View style={styles.nextEvent}>
                  <Calendar size={16} color="#d4af37" />
                  <Text style={styles.nextEventText}>{circle.nextEvent}</Text>
                </View>
              )}

              <View style={styles.circleActions}>
                <TouchableOpacity
                  style={styles.navigateButton}
                  onPress={() => handleNavigateToCircle(circle.id)}
                >
                  <Navigation size={16} color="#1b1f4a" />
                  <Text style={styles.navigateButtonText}>Itinéraire</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.joinButton}
                  onPress={() => handleJoinCircle(circle.id)}
                >
                  <Users size={16} color="#fff" />
                  <Text style={styles.joinButtonText}>Rejoindre</Text>
                </TouchableOpacity>
              </View>

              {selectedCircle === circle.id && (
                <View style={styles.expandedContent}>
                  <View style={styles.memberPreview}>
                    <Text style={styles.memberPreviewTitle}>Membres actifs</Text>
                    <View style={styles.memberAvatars}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <View key={i} style={styles.memberAvatar}>
                          <Text style={styles.memberInitial}>
                            {String.fromCharCode(65 + i)}
                          </Text>
                        </View>
                      ))}
                      <View style={styles.memberMore}>
                        <Text style={styles.memberMoreText}>+{circle.members - 5}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.recentActivity}>
                    <Text style={styles.activityTitle}>Activité récente</Text>
                    <View style={styles.activityItem}>
                      <View style={styles.activityDot} />
                      <Text style={styles.activityText}>Mission "Aide alimentaire" terminée</Text>
                      <Text style={styles.activityTime}>Il y a 2h</Text>
                    </View>
                    <View style={styles.activityItem}>
                      <View style={styles.activityDot} />
                      <Text style={styles.activityText}>Nouveau membre rejoint</Text>
                      <Text style={styles.activityTime}>Il y a 1j</Text>
                    </View>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}

          <View style={styles.createCirclePrompt}>
            <Text style={styles.promptTitle}>Pas de cercle dans votre zone ?</Text>
            <Text style={styles.promptText}>
              Créez votre propre cercle ONDA et rassemblez votre communauté !
            </Text>
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createButtonText}>Créer un cercle</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
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
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#e1e8ed',
    borderRadius: 20,
    padding: 2,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },
  toggleButtonActive: {
    backgroundColor: '#d4af37',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  mapPlaceholderText: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: 'bold',
    color: '#1b1f4a',
    marginTop: 16,
    textAlign: 'center',
  },
  mapPlaceholderSubtext: {
    fontSize: isTablet ? 18 : 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  switchToListButton: {
    backgroundColor: '#d4af37',
    paddingHorizontal: isTablet ? 32 : 24,
    paddingVertical: isTablet ? 16 : 12,
    borderRadius: 24,
    marginTop: 24,
  },
  switchToListText: {
    color: '#fff',
    fontSize: isTablet ? 18 : 16,
    fontWeight: '600',
  },
  circlesList: {
    flex: 1,
  },
  circlesContent: {
    paddingHorizontal: isTablet ? 40 : 20,
  },
  locationHeader: {
    marginBottom: 20,
  },
  currentLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: isTablet ? 18 : 16,
    color: '#1b1f4a',
    marginLeft: 8,
    fontWeight: '600',
  },
  circlesCount: {
    fontSize: isTablet ? 16 : 14,
    color: '#666',
  },
  circleCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: isTablet ? 24 : 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    maxWidth: isTablet ? 700 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
    width: isTablet ? '100%' : 'auto',
  },
  circleCardSelected: {
    borderColor: '#d4af37',
    borderWidth: 2,
  },
  circleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  circleMainInfo: {
    flex: 1,
  },
  circleName: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: 'bold',
    color: '#1b1f4a',
    marginBottom: 4,
  },
  circleLocation: {
    fontSize: isTablet ? 16 : 14,
    color: '#666',
  },
  circleStats: {
    alignItems: 'flex-end',
  },
  distanceText: {
    fontSize: isTablet ? 14 : 12,
    color: '#666',
    marginBottom: 4,
  },
  vibesIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vibesCount: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: 'bold',
    color: '#d4af37',
    marginLeft: 4,
  },
  circleDescription: {
    fontSize: isTablet ? 16 : 14,
    color: '#666',
    lineHeight: isTablet ? 24 : 20,
    marginBottom: 12,
  },
  circleMetrics: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metricText: {
    fontSize: isTablet ? 14 : 12,
    color: '#666',
    marginLeft: 4,
  },
  nextEvent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff8e1',
    padding: isTablet ? 12 : 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  nextEventText: {
    fontSize: isTablet ? 14 : 12,
    color: '#f57c00',
    marginLeft: 6,
    fontWeight: '600',
  },
  circleActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navigateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: isTablet ? 14 : 10,
    borderRadius: 8,
    marginRight: 8,
  },
  navigateButtonText: {
    color: '#1b1f4a',
    fontSize: isTablet ? 16 : 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  joinButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b1f4a',
    paddingVertical: isTablet ? 14 : 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: isTablet ? 16 : 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
  },
  memberPreview: {
    marginBottom: 16,
  },
  memberPreviewTitle: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: '600',
    color: '#1b1f4a',
    marginBottom: 8,
  },
  memberAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatar: {
    width: isTablet ? 40 : 32,
    height: isTablet ? 40 : 32,
    borderRadius: isTablet ? 20 : 16,
    backgroundColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  memberInitial: {
    color: '#fff',
    fontSize: isTablet ? 14 : 12,
    fontWeight: 'bold',
  },
  memberMore: {
    width: isTablet ? 40 : 32,
    height: isTablet ? 40 : 32,
    borderRadius: isTablet ? 20 : 16,
    backgroundColor: '#e1e8ed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberMoreText: {
    fontSize: isTablet ? 12 : 10,
    color: '#666',
    fontWeight: '600',
  },
  recentActivity: {},
  activityTitle: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: '600',
    color: '#1b1f4a',
    marginBottom: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  activityText: {
    flex: 1,
    fontSize: isTablet ? 14 : 12,
    color: '#666',
  },
  activityTime: {
    fontSize: isTablet ? 12 : 10,
    color: '#999',
  },
  createCirclePrompt: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: isTablet ? 30 : 20,
    alignItems: 'center',
    marginTop: 8,
    maxWidth: isTablet ? 600 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
    width: isTablet ? '100%' : 'auto',
  },
  promptTitle: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: 'bold',
    color: '#1b1f4a',
    marginBottom: 8,
  },
  promptText: {
    fontSize: isTablet ? 16 : 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: isTablet ? 24 : 20,
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#d4af37',
    paddingHorizontal: isTablet ? 32 : 24,
    paddingVertical: isTablet ? 16 : 12,
    borderRadius: 24,
  },
  createButtonText: {
    color: '#fff',
    fontSize: isTablet ? 18 : 16,
    fontWeight: '600',
  },
});