import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import { MessageCircle, Send, Heart, Share2, MoveHorizontal as MoreHorizontal, Trophy, Zap, Users } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const SAMPLE_POSTS = [
  {
    id: 1,
    author: 'Marie Dubois',
    avatar: 'MD',
    time: 'Il y a 1h',
    content: 'Super expérience lors du nettoyage du parc aujourd\'hui ! Nous étions 15 et avons collecté plus de 50kg de déchets. Merci à tous les participants ! 🌱',
    likes: 24,
    comments: 8,
    shares: 3,
    mission: 'Nettoyage Parc Central',
    vibesEarned: 50,
  },
  {
    id: 2,
    author: 'Thomas Martin',
    avatar: 'TM',
    time: 'Il y a 3h',
    content: 'Quelqu\'un serait intéressé pour créer un nouveau cercle dans le 15ème ? J\'ai quelques idées de missions solidaires pour le quartier.',
    likes: 18,
    comments: 12,
    shares: 5,
    mission: null,
    vibesEarned: null,
  },
  {
    id: 3,
    author: 'Sarah Johnson',
    avatar: 'SJ',
    time: 'Il y a 5h',
    content: 'Fière d\'avoir atteint le niveau 10 ! 🏆 Merci à toute la communauté ONDA pour ces moments incroyables. Prochaine mission : aide alimentaire ce weekend !',
    likes: 45,
    comments: 15,
    shares: 8,
    mission: null,
    vibesEarned: null,
    achievement: 'Niveau 10 atteint',
  },
  {
    id: 4,
    author: 'Lucas Petit',
    avatar: 'LP',
    time: 'Il y a 1j',
    content: 'Les enfants étaient ravis du cours de soutien hier ! Voir leurs sourires quand ils comprennent enfin un exercice... ça n\'a pas de prix 😊',
    likes: 32,
    comments: 6,
    shares: 2,
    mission: 'Soutien scolaire',
    vibesEarned: 75,
  },
];

const LEADERBOARD = [
  { rank: 1, name: 'Emma Wilson', vibes: 3240, avatar: 'EW' },
  { rank: 2, name: 'Jules Moreau', vibes: 2890, avatar: 'JM' },
  { rank: 3, name: 'Sophie Chen', vibes: 2650, avatar: 'SC' },
  { rank: 4, name: 'Alex Dubois', vibes: 2420, avatar: 'AD' },
  { rank: 5, name: 'Marine Leroy', vibes: 2180, avatar: 'ML' },
];

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<'feed' | 'leaderboard'>('feed');
  const [newPost, setNewPost] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const handleLike = (postId: number) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const handleShare = (postId: number) => {
    console.log('Share post:', postId);
  };

  const handleComment = (postId: number) => {
    console.log('Comment on post:', postId);
  };

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      console.log('New post:', newPost);
      setNewPost('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Communauté</Text>
        <View style={styles.tabSelector}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'feed' && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab('feed')}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'feed' && styles.tabButtonTextActive,
              ]}
            >
              Fil d'actualité
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'leaderboard' && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab('leaderboard')}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'leaderboard' && styles.tabButtonTextActive,
              ]}
            >
              Classement
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'feed' ? (
        <ScrollView 
          style={styles.feedContainer} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.feedContent}
        >
          {/* Post Composer */}
          <View style={styles.postComposer}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>TU</Text>
            </View>
            <View style={styles.composerInput}>
              <TextInput
                style={styles.textInput}
                placeholder="Partagez votre expérience ONDA..."
                value={newPost}
                onChangeText={setNewPost}
                multiline
              />
              <TouchableOpacity
                style={[
                  styles.postButton,
                  !newPost.trim() && styles.postButtonDisabled,
                ]}
                onPress={handlePostSubmit}
                disabled={!newPost.trim()}
              >
                <Send size={18} color={newPost.trim() ? '#fff' : '#ccc'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Community Stats */}
          <View style={styles.communityStats}>
            <View style={styles.statItem}>
              <Users size={isTablet ? 32 : 24} color="#d4af37" />
              <Text style={styles.statNumber}>1,247</Text>
              <Text style={styles.statLabel}>Membres actifs</Text>
            </View>
            <View style={styles.statItem}>
              <Zap size={isTablet ? 32 : 24} color="#d4af37" />
              <Text style={styles.statNumber}>23,580</Text>
              <Text style={styles.statLabel}>Vibes cette semaine</Text>
            </View>
            <View style={styles.statItem}>
              <Trophy size={isTablet ? 32 : 24} color="#d4af37" />
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Missions terminées</Text>
            </View>
          </View>

          {/* Posts Feed */}
          {SAMPLE_POSTS.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.postAuthorInfo}>
                  <View style={styles.authorAvatar}>
                    <Text style={styles.authorAvatarText}>{post.avatar}</Text>
                  </View>
                  <View>
                    <Text style={styles.authorName}>{post.author}</Text>
                    <Text style={styles.postTime}>{post.time}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                  <MoreHorizontal size={20} color="#666" />
                </TouchableOpacity>
              </View>

              {post.mission && (
                <View style={styles.missionTag}>
                  <Text style={styles.missionTagText}>Mission: {post.mission}</Text>
                  {post.vibesEarned && (
                    <View style={styles.vibesEarned}>
                      <Zap size={14} color="#d4af37" />
                      <Text style={styles.vibesEarnedText}>+{post.vibesEarned}</Text>
                    </View>
                  )}
                </View>
              )}

              {post.achievement && (
                <View style={styles.achievementTag}>
                  <Trophy size={16} color="#d4af37" />
                  <Text style={styles.achievementText}>{post.achievement}</Text>
                </View>
              )}

              <Text style={styles.postContent}>{post.content}</Text>

              <View style={styles.postActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleLike(post.id)}
                >
                  <Heart
                    size={20}
                    color={likedPosts.has(post.id) ? '#ff4757' : '#666'}
                    fill={likedPosts.has(post.id) ? '#ff4757' : 'none'}
                  />
                  <Text
                    style={[
                      styles.actionText,
                      likedPosts.has(post.id) && styles.actionTextActive,
                    ]}
                  >
                    {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleComment(post.id)}
                >
                  <MessageCircle size={20} color="#666" />
                  <Text style={styles.actionText}>{post.comments}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleShare(post.id)}
                >
                  <Share2 size={20} color="#666" />
                  <Text style={styles.actionText}>{post.shares}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView 
          style={styles.leaderboardContainer} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.leaderboardContent}
        >
          <View style={styles.leaderboardHeader}>
            <Text style={styles.leaderboardTitle}>Classement des Vibes</Text>
            <Text style={styles.leaderboardSubtitle}>Cette semaine</Text>
          </View>

          <View style={styles.topThree}>
            {LEADERBOARD.slice(0, 3).map((user, index) => (
              <View key={user.rank} style={[styles.topThreeItem, index === 0 && styles.winner]}>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>{user.rank}</Text>
                </View>
                <View style={[styles.topAvatar, index === 0 && styles.winnerAvatar]}>
                  <Text style={styles.topAvatarText}>{user.avatar}</Text>
                </View>
                <Text style={styles.topName}>{user.name}</Text>
                <View style={styles.topVibes}>
                  <Zap size={16} color="#d4af37" />
                  <Text style={styles.topVibesText}>{user.vibes}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.leaderboardList}>
            {LEADERBOARD.slice(3).map((user) => (
              <View key={user.rank} style={styles.leaderboardItem}>
                <View style={styles.leaderboardRank}>
                  <Text style={styles.rankNumber}>{user.rank}</Text>
                </View>
                <View style={styles.leaderboardAvatar}>
                  <Text style={styles.leaderboardAvatarText}>{user.avatar}</Text>
                </View>
                <Text style={styles.leaderboardName}>{user.name}</Text>
                <View style={styles.leaderboardVibes}>
                  <Zap size={16} color="#d4af37" />
                  <Text style={styles.leaderboardVibesText}>{user.vibes}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.userRank}>
            <Text style={styles.userRankTitle}>Votre position</Text>
            <View style={styles.userRankCard}>
              <View style={styles.userRankInfo}>
                <Text style={styles.userRankPosition}>#12</Text>
                <View style={styles.userRankAvatar}>
                  <Text style={styles.userRankAvatarText}>TU</Text>
                </View>
                <Text style={styles.userRankName}>Toi</Text>
              </View>
              <View style={styles.userRankVibes}>
                <Zap size={18} color="#d4af37" />
                <Text style={styles.userRankVibesText}>1,847</Text>
              </View>
            </View>
            <Text style={styles.userRankMotivation}>
              Plus que 333 vibes pour entrer dans le top 10 ! 🚀
            </Text>
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
    paddingHorizontal: isTablet ? 40 : 20,
    paddingTop: Platform.select({
      ios: 10,
      android: 20,
      default: 20,
    }),
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: isTablet ? 32 : 24,
    fontWeight: 'bold',
    color: '#1b1f4a',
    marginBottom: 16,
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: '#e1e8ed',
    borderRadius: 25,
    padding: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: isTablet ? 14 : 10,
    alignItems: 'center',
    borderRadius: 23,
  },
  tabButtonActive: {
    backgroundColor: '#d4af37',
  },
  tabButtonText: {
    fontSize: isTablet ? 16 : 14,
    color: '#666',
    fontWeight: '600',
  },
  tabButtonTextActive: {
    color: '#fff',
  },
  feedContainer: {
    flex: 1,
  },
  feedContent: {
    paddingBottom: Platform.select({
      ios: 120,
      android: 90,
      default: 90,
    }),
  },
  postComposer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: isTablet ? 24 : 16,
    marginHorizontal: isTablet ? 40 : 20,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: isTablet ? 700 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
    width: isTablet ? '100%' : 'auto',
  },
  userAvatar: {
    width: isTablet ? 50 : 40,
    height: isTablet ? 50 : 40,
    borderRadius: isTablet ? 25 : 20,
    backgroundColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userAvatarText: {
    color: '#fff',
    fontSize: isTablet ? 18 : 16,
    fontWeight: 'bold',
  },
  composerInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    fontSize: isTablet ? 18 : 16,
    color: '#333',
    marginRight: 12,
    maxHeight: 100,
  },
  postButton: {
    backgroundColor: '#1b1f4a',
    width: isTablet ? 44 : 36,
    height: isTablet ? 44 : 36,
    borderRadius: isTablet ? 22 : 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
  communityStats: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: isTablet ? 40 : 20,
    marginBottom: 16,
    padding: isTablet ? 24 : 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: isTablet ? 700 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
    width: isTablet ? '100%' : 'auto',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: 'bold',
    color: '#1b1f4a',
    marginTop: 8,
  },
  statLabel: {
    fontSize: isTablet ? 13 : 11,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  postCard: {
    backgroundColor: '#fff',
    marginHorizontal: isTablet ? 40 : 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: isTablet ? 24 : 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: isTablet ? 700 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
    width: isTablet ? '100%' : 'auto',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: isTablet ? 50 : 40,
    height: isTablet ? 50 : 40,
    borderRadius: isTablet ? 25 : 20,
    backgroundColor: '#e1e8ed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorAvatarText: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: 'bold',
    color: '#1b1f4a',
  },
  authorName: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: '600',
    color: '#1b1f4a',
  },
  postTime: {
    fontSize: isTablet ? 14 : 12,
    color: '#666',
    marginTop: 2,
  },
  moreButton: {
    padding: 4,
  },
  missionTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    padding: isTablet ? 12 : 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  missionTagText: {
    fontSize: isTablet ? 14 : 12,
    color: '#2e7d32',
    fontWeight: '600',
  },
  vibesEarned: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vibesEarnedText: {
    fontSize: isTablet ? 14 : 12,
    color: '#d4af37',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  achievementTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff8e1',
    padding: isTablet ? 12 : 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  achievementText: {
    fontSize: isTablet ? 14 : 12,
    color: '#f57c00',
    fontWeight: '600',
    marginLeft: 6,
  },
  postContent: {
    fontSize: isTablet ? 18 : 16,
    color: '#333',
    lineHeight: isTablet ? 26 : 22,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    fontSize: isTablet ? 16 : 14,
    color: '#666',
    marginLeft: 6,
  },
  actionTextActive: {
    color: '#ff4757',
  },
  leaderboardContainer: {
    flex: 1,
  },
  leaderboardContent: {
    paddingHorizontal: isTablet ? 40 : 20,
    paddingBottom: Platform.select({
      ios: 120,
      android: 90,
      default: 90,
    }),
  },
  leaderboardHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  leaderboardTitle: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: 'bold',
    color: '#1b1f4a',
  },
  leaderboardSubtitle: {
    fontSize: isTablet ? 16 : 14,
    color: '#666',
    marginTop: 4,
  },
  topThree: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: isTablet ? 30 : 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    maxWidth: isTablet ? 600 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
    width: isTablet ? '100%' : 'auto',
  },
  topThreeItem: {
    alignItems: 'center',
    marginBottom: 20,
  },
  winner: {
    transform: [{ scale: isTablet ? 1.15 : 1.1 }],
  },
  rankBadge: {
    backgroundColor: '#d4af37',
    width: isTablet ? 32 : 24,
    height: isTablet ? 32 : 24,
    borderRadius: isTablet ? 16 : 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  rankText: {
    color: '#fff',
    fontSize: isTablet ? 14 : 12,
    fontWeight: 'bold',
  },
  topAvatar: {
    width: isTablet ? 80 : 60,
    height: isTablet ? 80 : 60,
    borderRadius: isTablet ? 40 : 30,
    backgroundColor: '#e1e8ed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  winnerAvatar: {
    backgroundColor: '#d4af37',
  },
  topAvatarText: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: 'bold',
    color: '#1b1f4a',
  },
  topName: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: '600',
    color: '#1b1f4a',
    marginBottom: 4,
  },
  topVibes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topVibesText: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: 'bold',
    color: '#d4af37',
    marginLeft: 4,
  },
  leaderboardList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: isTablet ? 600 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
    width: isTablet ? '100%' : 'auto',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: isTablet ? 20 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  leaderboardRank: {
    width: isTablet ? 40 : 32,
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: 'bold',
    color: '#666',
  },
  leaderboardAvatar: {
    width: isTablet ? 50 : 40,
    height: isTablet ? 50 : 40,
    borderRadius: isTablet ? 25 : 20,
    backgroundColor: '#e1e8ed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  leaderboardAvatarText: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: 'bold',
    color: '#1b1f4a',
  },
  leaderboardName: {
    flex: 1,
    fontSize: isTablet ? 18 : 16,
    color: '#1b1f4a',
    fontWeight: '500',
  },
  leaderboardVibes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaderboardVibesText: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: 'bold',
    color: '#d4af37',
    marginLeft: 4,
  },
  userRank: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: isTablet ? 24 : 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: isTablet ? 600 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
    width: isTablet ? '100%' : 'auto',
  },
  userRankTitle: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: '600',
    color: '#1b1f4a',
    marginBottom: 12,
  },
  userRankCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: isTablet ? 16 : 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  userRankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userRankPosition: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: 'bold',
    color: '#d4af37',
    marginRight: 12,
  },
  userRankAvatar: {
    width: isTablet ? 44 : 36,
    height: isTablet ? 44 : 36,
    borderRadius: isTablet ? 22 : 18,
    backgroundColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userRankAvatarText: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  userRankName: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: '600',
    color: '#1b1f4a',
  },
  userRankVibes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userRankVibesText: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: 'bold',
    color: '#d4af37',
    marginLeft: 4,
  },
  userRankMotivation: {
    fontSize: isTablet ? 14 : 12,
    color: '#666',
    textAlign: 'center',
  },
});